import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import { TextInput } from 'react-native-paper';

export default function PrivateKeyInput({ form, label, hint, value, onChangeValue }) {
  const [internalValue, setInternalValue, error] = useInput(form, value, [
    (a) => !!a || 'Private key is required',
    (a) => a.length >= 2 || 'Private key is too short',
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
