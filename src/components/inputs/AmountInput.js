import useEffectExceptOnMount from '@/hooks/effects/useEffectExceptOnMount';
import Big from 'big.js';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, IconButton, TextInput } from 'react-native-paper';

export default function AmountInput({ min, max, funds, hint, amount, onChangeAmount }) {
  const getBigMin = useCallback(() => Big(min === undefined ? 0 : min), [min]);
  const getBigMax = useCallback(() => max === undefined ? undefined : Big(max), [max]);
  const getBigFunds = useCallback(() => Big(funds === undefined ? 0 : funds), [funds]);

  // TODO This logic should be inside a custom hook to reuse inside many fields.
  const [valid, setValid] = useState(true);
  const [error, setError] = useState(undefined);
  const [internalAmount, setInternalAmount] = useState(amount);

  useEffectExceptOnMount(() => {
    const rules = [
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
      (a) => max === undefined || getBigMax().gte(Big(a)) || `Amount must be at most ${max}`,
      (a) => getBigFunds().gte(Big(a)) || `Not enough funds`,
    ];

    setError(undefined);

    const hasError = rules.some((rule) => {
      const result = rule(internalAmount);
      if (result !== true) {
        setError(result);

        return true;
      }

      return false;
    });

    setValid(!hasError);

    if (onChangeAmount) {
      onChangeAmount(internalAmount);
    }
  }, [internalAmount]);

  const setVerifiedInternalAmount = (operation) => {
    let bigAmount;
    try {
      bigAmount = Big(internalAmount === undefined ? 0 : internalAmount);
    } catch (_) {
      bigAmount = Big(0);
    }

    setInternalAmount(operation(bigAmount).toString());
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
      handler: () => setVerifiedInternalAmount(
        () => (getBigFunds()).eq(0) ? Big(0) : getBigFunds().times(0.25),
      ),
    },
    {
      text: '50%',
      handler: () => setVerifiedInternalAmount(
        () => (getBigFunds()).eq(0) ? Big(0) : getBigFunds().times(0.50),
      ),
    },
    {
      text: 'Max',
      handler: () => setVerifiedInternalAmount(
        () => (max === undefined || getBigFunds().lte(getBigMax())) ? getBigFunds() : getBigMax(),
      ),
    },
  ];

  return (
    <View>
      <View style={styles.rowWrapper}>
        <IconButton
          icon="minus"
          size={20}
          accessibilityLabel="Decrement amount"
          onPress={handleDecrementInternalAmount}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            label="Amount"
            activeUnderlineColor="white"
            keyboardType="numeric"
            error={!valid}
            value={internalAmount}
            dense
            onChangeText={setInternalAmount}
            right={<TextInput.Affix text="CSPR" />}
          />
          <HelperText
            type={valid ? 'info' : 'error'}
            visible={!!error || !!hint}
          >
            {error || hint}
          </HelperText>
        </View>
        <IconButton
          icon="plus"
          size={20}
          accessibilityLabel="Increment amount"
          onPress={handleIncrementInternalAmount}
        />
      </View>
      <View style={styles.rowWrapper}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flexGrow: 1,
  },
  messagesWrapper: {
    paddingHorizontal: 42,
  },
  quickButton: {
    flexGrow: 1,
  },
});
