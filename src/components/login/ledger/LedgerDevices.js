import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import LedgerKeys from '@/components/login/ledger/LedgerKeys';
import TransportHID from '@ledgerhq/react-native-hid';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';


const SCAN_TIMEOUT_IN_SECONDS = 10;

/**
 * Ledger devices
 * @returns {JSX.Element}
 * @constructor
 */
export default function LedgerDevices() {
  const theme = useTheme();
  const [scanning, setScanning] = useState(true);
  const [devices, setDevices] = useState([]);
  const [usbDevices, setUsbDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState();

  useEffect(() => {
    if (scanning) {
      setUsbDevices([]);
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

      let usb;

      if (Platform.OS === 'android') {
        usb = TransportHID.listen({
          next: async (event) => {
            if (event.type === 'add') {
              const device = event;
              if (!usbDevices.some((d) => d.descriptor.deviceId === device.descriptor.deviceId)) {
                setUsbDevices([...usbDevices, device]);
              }
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
      const timeout = setTimeout(() => {
        subscription.unsubscribe();
        if (Platform.OS === 'android') {
          usb.unsubscribe();
        }
        setScanning(false);
      }, SCAN_TIMEOUT_IN_SECONDS * 1000);

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
        if (Platform.OS === 'android') {
          usb.unsubscribe();
        }
      };
    }
  }, [scanning]);

  const handleDeviceSelect = useCallback((device, usb = false) => {
    if (usb) {
      setSelectedDevice(device);
    } else {
      setSelectedDevice({ id: device.id, name: device.name });
    }
  }, [selectedDevice]);

  const handleCancel = useCallback(() => {
    setSelectedDevice(undefined);
  }, [selectedDevice]);

  return (
    <GridRow>
      {
        selectedDevice === undefined ?
          <>
            {!scanning && <GridCol>
              <Text style={styles.textCenter}>
                {devices.length + usbDevices.length > 0 ? `${devices.length + usbDevices.length} devices available.` : 'No device detected.'}
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
            {usbDevices.map((device, index) => <GridCol key={index}>
              <Card style={{ backgroundColor: theme.colors.background }}>
                <Card.Content>
                  <Text>
                    {device.deviceModel.productName} - USB
                  </Text>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                  <Button
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    icon="chevron-right"
                    color="white"
                    onPress={() => handleDeviceSelect(device.descriptor, true)}
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
          </> :
          <>
            <LedgerKeys
              selectedDevice={selectedDevice}
              handleCancel={handleCancel}
            />
          </>
      }
    </GridRow>
  );
}

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});
