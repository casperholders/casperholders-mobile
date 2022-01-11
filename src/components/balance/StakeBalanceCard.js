import formatCasperAmount from '@/helpers/formatCasperAmount';
import truncateInMiddle from '@/helpers/truncateInMiddle';
import { StyleSheet } from 'react-native';
import { Button, Caption, Card, Paragraph } from 'react-native-paper';

export default function ({ validator, staked, formattedPercentOfTotal, delegationRate }) {
  const description = `${formattedPercentOfTotal}% of your staked funds ꞏ Validator ${truncateInMiddle(validator)}`;
  const styles = StyleSheet.create({
    actions: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  });
  return (
    <Card style={{ marginLeft: 12, marginBottom: 12 }}>
      <Card.Content>
        <Paragraph>
          {formatCasperAmount(staked)}
        </Paragraph>
        <Caption>
          {description}
        </Caption>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            style={{ marginRight: 8 }}
          >Stake</Button>
          <Button mode="contained">Unstake</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
}
