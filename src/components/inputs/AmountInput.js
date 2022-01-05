import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import Big from 'big.js';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

export default function AmountInput({ form, min, fee, funds, hint, amount, onChangeAmount }) {
  const getBigMin = useCallback(() => Big(min === undefined ? 0 : min), [min]);
  const getBigMax = useCallback(() => {
    const max = Big(funds === undefined ? 0 : funds).minus(fee === undefined ? 0 : fee);

    return max.gt(0) ? max : Big(0);
  }, [funds, fee]);

  const [value, setValue, valid, error] = useInput(form, amount, [
    (a) => !!a || 'Amount is required',
    (a) => {
      try {
        Big(a);

        return true;
      } catch (_) {
        return 'Amount must be a number';
      }
    },
    (a) => getBigMin().lte(Big(a)) || `Amount must be at least ${min}`,
    (a) => getBigMax().gte(Big(a)) || 'Not enough funds',
  ], onChangeAmount);

  const setVerifiedInternalAmount = (operation) => {
    let bigAmount;
    try {
      bigAmount = Big(value.current === undefined ? 0 : value.current);
    } catch (_) {
      bigAmount = Big(0);
    }

    setValue(operation(bigAmount).toString());
  };

  const handleDecrementInternalAmount = () => setVerifiedInternalAmount((a) => a.minus(1));
  const handleIncrementInternalAmount = () => setVerifiedInternalAmount((a) => a.plus(1));
  const amountQuickActions = [
    {
      text: 'Min',
      handler: () => setVerifiedInternalAmount(() => getBigMin()),
    },
    {
      text: '25%',
      handler: () => setVerifiedInternalAmount(() => getBigMax().times(0.25)),
    },
    {
      text: '50%',
      handler: () => setVerifiedInternalAmount(() => getBigMax().times(0.50)),
    },
    {
      text: 'Max',
      handler: () => setVerifiedInternalAmount(() => getBigMax()),
    },
  ];

  return (
    <InputWrapper>
      <TextInput
        label="Amount"
        activeUnderlineColor="white"
        keyboardType="numeric"
        error={!valid}
        value={value.current}
        dense
        onChangeText={setValue}
        left={
          <TextInput.Icon
            name="minus"
            accessibilityLabel="Decrement amount"
            forceTextInputFocus={false}
            onPress={handleDecrementInternalAmount}
          />
        }
        right={
          <TextInput.Icon
            name="plus"
            size={20}
            accessibilityLabel="Increment amount"
            forceTextInputFocus={false}
            onPress={handleIncrementInternalAmount}
          />
        }
      />
      <HelperText
        type={valid ? 'info' : 'error'}
        visible={!!error || !!hint}
      >
        {error || hint}
      </HelperText>
      <View style={styles.quickButtons}>
        {amountQuickActions.map(({ text, handler }, index) => (
          <Button
            key={index}
            color="white"
            style={styles.quickButton}
            compact
            onPress={handler}
          >
            {text}
          </Button>
        ))}
      </View>
    </InputWrapper>
  );
}

const styles = StyleSheet.create({
  quickButtons: {
    flexDirection: 'row',
  },
  quickButton: {
    flexGrow: 1,
  },
});
