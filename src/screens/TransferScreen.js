import AmountInput from '@/components/inputs/AmountInput';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

async function asyncFunctionToGetMin() {
  return 2.5;
}

export default function TransferScreen() {
  const [loading, setLoading] = useState(false);
  const [minAmount, setMinAmount] = useState(undefined);

  // TODO Remove this. This is just an example on how to retrieve an async content.
  useEffect(() => {
    async function fetchMin() {
      setMinAmount(await asyncFunctionToGetMin());
      setLoading(false);
    }

    fetchMin();
  }, []);

  return (
    <View style={{ padding: 8 }}>
      {loading ? (
        <ActivityIndicator animating />
      ) : (
        <>
          <Text>Transfer!</Text>
          <AmountInput
            min={minAmount}
            hint={`Amount to transfer (minimum of ${minAmount} CSPR)`}
            funds="1000"
          />
        </>
      )}
    </View>
  );
}
