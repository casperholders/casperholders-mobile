import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function ({ title, ...other }) {
  return (
    <Button
      style={styles.button}
      labelStyle={styles.buttonLabel}
      mode="contained"
      {...other}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 26,
  },
});
