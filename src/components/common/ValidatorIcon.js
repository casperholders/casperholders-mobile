import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

/**
 * Validator icon component
 * @param url
 * @param size
 * @param left
 * @param right
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
export default function ValidatorIcon({ url, size, left, right, style }) {
  const styles = StyleSheet.create({
    iconWrapper: {
      alignSelf: 'center',
      paddingLeft: right ? 12 : 0,
      paddingRight: left ? 12 : 0,
    },
  });

  return (
    <View style={{ ...styles.iconWrapper, ...style }}>
      <Avatar.Image
        size={size}
        style={{ backgroundColor: 'white' }}
        source={{ uri: url }}
      />
    </View>
  );
}
