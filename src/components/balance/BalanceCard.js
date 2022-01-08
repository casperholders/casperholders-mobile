import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function BalanceCard({ left, children }) {
  return (
    <Card>
      <Card.Content style={styles.contentWrapper}>
        {left}
        <View>
          {children}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
