import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import LedgerAdapter from '@/services/newSigners/ledgerAdapter';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

const SCAN_TIMEOUT_IN_SECONDS = 10;

export default function LedgerDevices() {
  const theme = useTheme();
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (scanning) {
      const subscription = TransportBLE.listen({
        next: (event) => {
          if (event.type === 'add') {
            const device = event.descriptor;
            if (!devices.some((d) => d.id === device.id)) {
              setDevices([...devices, device]);
            }
          }
        },
        error: (error) => {
          console.log(error);
        },
      });

      const timeout = setTimeout(() => {
        subscription.unsubscribe();
        setScanning(false);
      }, SCAN_TIMEOUT_IN_SECONDS * 1000);

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    }
  }, [scanning]);

  const handleDeviceSelect = useCallback(async (device) => {
    if (!loading) {
      setLoading(true);

      const transport = await TransportBLE.open(device);
      const app = new CasperApp(transport);
      const ledgerKey = (await app.getAddressAndPubKey('m/44\'/506\'/0\'/0/0')).publicKey.toString('hex');
      const firstKey = `02${ledgerKey}`;

      dispatchConnect({
        adapterId: LedgerAdapter.ID,
        options: {
          // TODO Fill the first keys.
          keysByKeyPaths: [
            firstKey,
          ],
          activeKeyPath: 0,
          deviceId: device.id,
          deviceName: device.name,
        },
      });
    }
  }, []);

  return (
    <GridRow>
      {!scanning && <GridCol>
        <Text style={styles.textCenter}>
          {devices.length ? `${devices.length} devices available.` : 'No device detected.'}
        </Text>
      </GridCol>}
      {devices.map((device) => <GridCol key={device.id}>
        <Card style={{ backgroundColor: theme.colors.background }}>
          <Card.Content>
            <Text>
              {device.name}
            </Text>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button
              contentStyle={{ flexDirection: 'row-reverse' }}
              icon="chevron-right"
              color="white"
              onPress={() => handleDeviceSelect(device)}
            >
              Connect
            </Button>
          </Card.Actions>
        </Card>
      </GridCol>)}
      <GridCol>
        <Button
          loading={scanning}
          icon="refresh"
          type="info"
          mode="contained"
          onPress={() => setScanning(true)}
        >
          {scanning ? 'Scanning...' : 'Refresh'}
        </Button>
      </GridCol>
    </GridRow>
  );
}

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});
