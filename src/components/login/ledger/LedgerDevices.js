import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';
import { useCallback, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';

export default function LedgerDevices() {
  const [scanning, setScanning] = useState(true);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const subscription = TransportBLE.listen({
      next: e => {
        if (e.type === 'add') {
          const device = e.descriptor;
          if (!devices.some((d) => d.id === device.id)) {
            setDevices([...devices, device]);
          }
        }
      },
      error: error => {
        console.log(error);
      },
    });

    const timeout = setTimeout(() => {
      subscription.unsubscribe();
      setScanning(false);
    }, 60 * 1000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
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
    <>
      {devices.map((child, index) => (
        <Button
          key={index}
          style={{ backgroundColor: 'black' }}
          onPress={() => deviceInfo(child)}
        >
          {child.name}
        </Button>
      ))}
    </>
  );
}
