import { StyleSheet, View } from 'react-native';

export default function GridCol({ width, children, style }) {
  const percentageWidth = `${(typeof width === 'number' ? width : 1) * 100}%`;

  return (
    <View style={{ ...styles.col, width: percentageWidth, ...style }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    padding: 8,
  },
});
