import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import { CLPublicKey } from 'casper-js-sdk';
import { TextInput } from 'react-native-paper';

/**
 * Public key input
 * @param form
 * @param label
 * @param hint
 * @param value
 * @param onChangeValue
 * @returns {JSX.Element}
 * @constructor
 */
export default function PublicKeyInput({ form, label, hint, value, onChangeValue }) {
  const [internalValue, setInternalValue, error] = useInput(form, value, [
    (a) => !!a || 'Public key is required',
    (a) => a.length >= 2 || 'Public key is too short',
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
        testID="publicKeyInput"
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
