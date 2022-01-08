import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import { TextInput } from 'react-native-paper';

export default function TransferIdInput({ form, label, hint, value, onChangeValue }) {
  const [internalValue, setInternalValue, error] = useInput(form, value, [
    (a) => !!a || 'Transfer ID is required',
    (a) => /^[0-9]+$/.test(a) || 'Transfer ID must be a number',
  ], onChangeValue);

  const handlePaste = usePasteHandler(setInternalValue);

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
        left={<TextInput.Icon name="pound" />}
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
