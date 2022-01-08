import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import { CLPublicKey } from 'casper-js-sdk';
import { TextInput } from 'react-native-paper';

export default function AddressInput({ form, label, hint, value, onChangeValue }) {
  const [internalValue, setInternalValue, error] = useInput(form, value, [
    (a) => !!a || 'Address is required',
    (a) => a.length >= 2 || 'Address is too short',
    (a) => {
      try {
        CLPublicKey.fromHex(a);
        return true;
      } catch (e) {
        return e.toString();
      }
    },
  ], onChangeValue);

  const handlePaste = usePasteHandler(setInternalValue);

  return (
    <InputWrapper>
      <TextInput
        label={label}
        activeUnderlineColor="white"
        error={!!error}
        value={internalValue.current}
        dense
        onChangeText={setInternalValue}
        left={<TextInput.Icon name="account" />}
        right={<TextInput.Icon
          name="content-paste"
          accessibilityLabel="Paste"
          forceTextInputFocus={false}
          onPress={handlePaste}
        />}
      />
      <InputMessages
        error={error}
        hint={hint}
      />
    </InputWrapper>
  );
}
