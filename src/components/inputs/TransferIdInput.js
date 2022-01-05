import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import { HelperText, TextInput } from 'react-native-paper';

export default function TransferIdInput({ form, transferId, onChangeTransferId }) {
  const [value, setValue, valid, error] = useInput(form, transferId, [
    (a) => !!a || 'Transfer ID is required',
    (a) => /^[0-9]+$/.test(a) || 'Transfer ID must be a number',
  ], onChangeTransferId);

  const handlePaste = usePasteHandler(setValue);

  return (
    <InputWrapper>
      <TextInput
        label="TransferId"
        activeUnderlineColor="white"
        keyboardType="numeric"
        error={!valid}
        value={value.current}
        dense
        onChangeText={setValue}
        left={<TextInput.Icon name="pound" />}
        right={<TextInput.Icon
          name="content-paste"
          accessibilityLabel="Paste"
          forceTextInputFocus={false}
          onPress={handlePaste}
        />}
      />
      <HelperText type={valid ? 'info' : 'error'}>
        {error || 'You can leave 0 if unknown'}
      </HelperText>
    </InputWrapper>
  );
}
