import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

export default function ScreenWrapper({ children, onRefresh, ...other }) {
  const refreshControl = onRefresh ? <RefreshControl
    refreshing={false}
    onRefresh={onRefresh}
  /> : undefined;

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      refreshControl={refreshControl}
      {...other}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
