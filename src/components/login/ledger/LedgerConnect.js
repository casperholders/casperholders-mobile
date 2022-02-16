import Alert from '@/components/common/Alert';
import LedgerDevices from '@/components/login/ledger/LedgerDevices';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Button } from 'react-native-paper';

/**
 * Ledger connect bottom sheet content
 * @returns {JSX.Element}
 * @constructor
 */
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

  const handleOpenBluetooth = useCallback(async () => {
    if (Platform.OS === 'android') {
      const locationGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!locationGranted) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Casper Holders Location Permission',
            message:
              'Casper Holders needs access to your location ' +
              'to scan ledger devices.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return;
        }
      }
    }
    await Location.enableNetworkProviderAsync();
    await new BleManager().enable();
  }, []);

  return bluetooth ? <LedgerDevices /> : <>
    <Alert
      type="error"
      message="You must enable bluetooth & location to connect with Ledger."
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
