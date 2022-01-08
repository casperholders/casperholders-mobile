import { HelperText } from 'react-native-paper';

export default function InputMessages({ error, hint }) {
  return (
    <HelperText
      type={error ? 'error' : 'info'}
      visible={!!error || !!hint}
    >
      {error || hint}
    </HelperText>
  );
}
