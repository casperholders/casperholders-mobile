import { ScrollView, StyleSheet, View } from 'react-native';

export default function ScreenWrapper({ children, ...other }) {
  return (
    <ScrollView {...other}>
      <View style={styles.wrapper}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
