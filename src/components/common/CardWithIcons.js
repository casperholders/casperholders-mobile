import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function CardWithIcons({ left, right, children, ...other }) {
  return (
    <Card {...other}>
      <Card.Content style={styles.contentWrapper}>
        {left}
        <View style={styles.content}>
          {children}
        </View>
        {right}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
