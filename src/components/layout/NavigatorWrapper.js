import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function NavigatorWrapper({ children }) {
  const theme = useTheme();

  // Wrapping the navigation into a view to avoid screen bugs.
  // See https://github.com/callstack/react-native-paper/issues/2999
  return (
    <NavigationContainer theme={theme}>
      <View
        style={styles.wrapper}
        collapsable={false}
      >
        {children}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
