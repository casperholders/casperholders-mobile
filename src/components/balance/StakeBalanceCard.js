import formatCasperAmount from '@/helpers/formatCasperAmount';
import truncateInMiddle from '@/helpers/truncateInMiddle';
import useAdapter from '@/hooks/auth/useAdapter';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { StyleSheet } from 'react-native';
import { Button, Caption, Card, Paragraph, useTheme } from 'react-native-paper';

export default function (
  { navigation, validator, staked, formattedPercentOfTotal, delegationRate },
) {
  const adapter = useAdapter();
  const readOnly = adapter.constructor.ID === ReadOnlyAdapter.ID;
  const theme = useTheme();
  const description = `${formattedPercentOfTotal}% of your staked funds ꞏ Validator ${truncateInMiddle(validator)}`;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph>
          {formatCasperAmount(staked)}
        </Paragraph>
        <Caption>
          {description}
        </Caption>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          style={styles.actionsStake}
          color={theme.colors.text}
          onPress={() => navigation.jumpTo('OperationsTab', {
            screen: 'Stake',
            address: validator,
            initial: false,
          })}
          disabled={readOnly}
        >
          Stake
        </Button>
        <Button
          color={theme.colors.text}
          onPress={() => navigation.jumpTo('OperationsTab', {
            screen: 'Unstake',
            address: validator,
            initial: false,
          })}
          disabled={readOnly}
        >
          Unstake
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 12,
    marginBottom: 12,
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  actionsStake: {
    marginRight: 8,
  },
});
