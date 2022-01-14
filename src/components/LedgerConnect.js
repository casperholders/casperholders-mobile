import Alert from '@/components/common/Alert';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';
import { useCallback, useState } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function LedgerConnect({}) {
  const [bluetooth, setBluetooth] = useState(false);
  const [devices, setDevices] = useState([]);
  const subscription = TransportBLE.observeState({
    next: e => setBluetooth(e.available),
    complete: () => {
    },
    error: () => {
    },
  });

  const test = TransportBLE.listen({
    next: e => {
      if (e.type === 'add') {
        const device = e.descriptor;
        setDevices(devices =>
          devices.some(i => i.id === device.id)
            ? devices
            : [...devices, device],
        );
      }
    },
    error: error => {
      console.log(error);
    },
  });

  const deviceInfo = useCallback(async (device) => {
    console.log(device.name);
    try {
      const transport = await TransportBLE.open(device);
      const app = new CasperApp(transport);
      const key = `02${(await app.getAddressAndPubKey('m/44\'/506\'/0\'/0/0')).publicKey.toString('hex')}`;
      try {
        let devices = [];
        const value = await AsyncStorage.getItem('@devices');
        if (value !== null) {
          devices = JSON.parse(value);
        }
        console.log(devices);
        if (!devices.includes(device.id)) {
          devices.push(device.id);
          await AsyncStorage.setItem('@devices', JSON.stringify(devices));
        } else {
          console.log('Device already saved');
        }
      } catch (e) {
        console.log(e);
      }
      console.log(key);
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <GridRow>
      <GridCol style={styles.center}>
        <Title>Connect to ledger</Title>
      </GridCol>
      <GridCol style={{ padding: 20 }}>
        <Alert
          type={bluetooth ? 'info' : 'error'}
          message={bluetooth ? 'Bluetooth enabled' : 'Enable bluetooth'}
        />
        {
          devices.map((child, index) => (
            <Button
              key={index}
              style={{ backgroundColor: 'black' }}
              onPress={() => deviceInfo(child)}
            >
              {child.name}
            </Button>
          ))}
      </GridCol>
    </GridRow>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
