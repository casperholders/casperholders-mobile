import { HelperText } from 'react-native-paper';

/**
 * Input message
 * @param error
 * @param hint
 * @returns {JSX.Element}
 * @constructor
 */
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
