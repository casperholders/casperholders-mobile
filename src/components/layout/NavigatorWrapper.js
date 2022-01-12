import { StyleSheet, View } from 'react-native';

export default function NavigatorWrapper({ children }) {
  // Wrapping the navigation into a view to avoid screen bugs.
  // See https://github.com/callstack/react-native-paper/issues/2999
  return (
    <View
      style={styles.wrapper}
      collapsable={false}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
