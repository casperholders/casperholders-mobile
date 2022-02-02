import { StyleSheet, View } from 'react-native';

/**
 * Button group component
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonGroup({ children }) {
  return (
    <View style={styles.buttonGroup}>
      {children.map((child, index) => (
        <View
          key={index}
          style={styles.buttonGroupItem}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonGroupItem: {
    flexGrow: 1,
  },
});
