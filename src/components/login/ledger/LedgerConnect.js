import Alert from '@/components/common/Alert';
import LedgerDevices from '@/components/login/ledger/LedgerDevices';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import { useCallback, useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


export default function LedgerConnect() {
  const [bluetooth, setBluetooth] = useState(false);

  useEffect(() => {
    const subscription = TransportBLE.observeState({
      next: (event) => setBluetooth(event.available),
      complete: () => {
      },
      error: () => {
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // TODO Open bluetooth settings.
  const handleOpenBluetooth = useCallback(() => Linking.openSettings(), []);

  return bluetooth ? <LedgerDevices /> : <>
    <Alert
      type="error"
      message="You must enable bluetooth to connect with Ledger."
    />
    <Button
      icon="bluetooth"
      mode="contained"
      onPress={handleOpenBluetooth}
    >
      Enable bluetooth
    </Button>
  </>;
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
