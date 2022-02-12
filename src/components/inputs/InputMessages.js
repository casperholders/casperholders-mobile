import { HelperText } from 'react-native-paper';

/**
 * Input message
 * @param error
 * @param hint
 * @returns {JSX.Element}
 * @constructor
 */
export default function InputMessages({ testID, error, hint }) {
  return (
    <HelperText
      testID={testID}
      type={error ? 'error' : 'info'}
      visible={!!error || !!hint}
    >
      {error || hint}
    </HelperText>
  );
}
