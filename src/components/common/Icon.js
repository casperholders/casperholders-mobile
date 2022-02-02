import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

/**
 * Icon component
 * @param name
 * @param size
 * @param left
 * @param right
 * @param color
 * @param style
 * @returns {JSX.Element}
 * @constructor
 */
export default function Icon({ name, size, left, right, color, style }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    iconWrapper: {
      alignSelf: 'center',
      paddingLeft: right ? 12 : 0,
      paddingRight: left ? 12 : 0,
    },
  });

  return (
    <View style={{ ...styles.iconWrapper, ...style }}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color || theme.colors.text}
      />
    </View>
  );
}
