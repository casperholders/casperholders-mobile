import { ScrollView, StyleSheet } from 'react-native';

export default function ScreenWrapper({ children, ...other }) {
  return (
    <ScrollView contentContainerStyle={styles.wrapper} {...other}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
