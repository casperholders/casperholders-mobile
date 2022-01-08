import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={50}
        animating
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
