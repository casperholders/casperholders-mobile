import { StyleSheet, View } from 'react-native';

export default function InputWrapper({ children, ...other }) {
  return (
    <View style={styles.inputWrapper} {...other}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginVertical: 4,
  },
});
