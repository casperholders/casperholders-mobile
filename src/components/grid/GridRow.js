import { StyleSheet, View } from 'react-native';

export default function GridRow({ children }) {
  return (
    <View style={styles.row}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -8,
  },
});