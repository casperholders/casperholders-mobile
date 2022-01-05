import InputWrapper from '@/components/inputs/InputWrapper';
import useInput from '@/hooks/inputs/useInput';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import { CLPublicKey } from 'casper-js-sdk';
import { HelperText, TextInput } from 'react-native-paper';

export default function AddressInput({ form, hint, address, onChangeAddress }) {
  const [value, setValue, valid, error] = useInput(form, address, [
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
  ], onChangeAddress);

  const handlePaste = usePasteHandler(setValue);

  return (
    <InputWrapper>
      <TextInput
        label="Address"
        activeUnderlineColor="white"
        error={!valid}
        value={value.current}
        dense
        onChangeText={setValue}
        left={<TextInput.Icon name="account" />}
        right={<TextInput.Icon
          name="content-paste"
          accessibilityLabel="Paste"
          forceTextInputFocus={false}
          onPress={handlePaste}
        />}
      />
      <HelperText
        type={valid ? 'info' : 'error'}
        visible={!!error || !!hint}
      >
        {error || hint}
      </HelperText>
    </InputWrapper>
  );
}
