import Alert from '@/components/common/Alert';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import LedgerDevices from '@/components/login/ledger/LedgerDevices';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

export default function LedgerConnect({}) {
  const [bluetooth, setBluetooth] = useState(false);

  useEffect(() => {
    const subscription = TransportBLE.observeState({
      next: (e) => setBluetooth(e.available),
      complete: () => {
      },
      error: () => {
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        {bluetooth && <LedgerDevices />}
      </GridCol>
    </GridRow>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
