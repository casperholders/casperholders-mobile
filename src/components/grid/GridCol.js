import { StyleSheet, View } from 'react-native';

/**
 * GridCol component
 * @param width
 * @param children
 * @param style
 * @param ...attrs
 * @returns {JSX.Element}
 * @constructor
 */
export default function GridCol({ width, children, style, ...attrs }) {
  const percentageWidth = `${(typeof width === 'number' ? width : 1) * 100}%`;

  return (
    <View
      style={{ ...styles.col, width: percentageWidth, ...style }}
      {...attrs}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    padding: 8,
  },
});
