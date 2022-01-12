import ButtonGroup from '@/components/common/ButtonGroup';
import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import Big from 'big.js';
import { useCallback } from 'react';
import { Button, TextInput } from 'react-native-paper';

export default function AmountInput({ form, label, hint, min, fee, funds, value, onChangeValue }) {
  const getBigMin = useCallback(() => Big(min === undefined ? 0 : min), [min]);
  const getBigMax = useCallback(() => {
    const max = Big(funds === undefined ? 0 : funds).minus(fee === undefined ? 0 : fee);

    return max.gt(0) ? max : Big(0);
  }, [funds, fee]);

  const [internalValue, setInternalValue, error] = useInput(form, value, [
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
  ], onChangeValue);

  const setVerifiedInternalAmount = (operation) => {
    let bigAmount;
    try {
      bigAmount = Big(internalValue.current === undefined ? 0 : internalValue.current);
    } catch (_) {
      bigAmount = Big(0);
    }

    setInternalValue(operation(bigAmount).toString());
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
        label={label}
        activeUnderlineColor="white"
        keyboardType="numeric"
        error={!!error}
        value={internalValue.current}
        dense
        onChangeText={setInternalValue}
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
      <InputMessages
        error={error}
        hint={hint}
      />
      <ButtonGroup>
        {amountQuickActions.map(({ text, handler }, index) => (
          <Button
            key={index}
            color="white"
            onPress={handler}
          >
            {text}
          </Button>
        ))}
      </ButtonGroup>
    </InputWrapper>
  );
}
