import { StyleSheet, View } from 'react-native';

/**
 * Grid row component
 * @param children
 * @param ...attrs
 * @returns {JSX.Element}
 * @constructor
 */
export default function GridRow({ children, ...attrs }) {
  return (
    <View style={styles.row} {...attrs}>
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
