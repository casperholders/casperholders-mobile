import ValidatorIcon from '@/components/common/ValidatorIcon';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import truncateInMiddle from '@/helpers/truncateInMiddle';
import useAdapter from '@/hooks/auth/useAdapter';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { StyleSheet, View } from 'react-native';
import { Button, Caption, Card, Paragraph, useTheme } from 'react-native-paper';

/**
 * Stake balance card component
 * @param navigation
 * @param validator
 * @param staked
 * @param image
 * @param formattedPercentOfTotal
 * @param delegationRate
 * @returns {JSX.Element}
 */
export default function (
  { navigation, validator, staked, image, formattedPercentOfTotal, delegationRate },
) {
  const adapter = useAdapter();
  const readOnly = adapter.constructor.ID === ReadOnlyAdapter.ID;
  const theme = useTheme();
  const description = `${formattedPercentOfTotal}% of your staked funds - ${delegationRate}% fee`;

  return (
    <Card style={styles.card}>
      <Card.Content style={{ flexDirection: 'row' }}>
        {
          image !== undefined && <ValidatorIcon
            url={image}
            size={35}
            left
          />
        }
        <View style={{ flex: 1 }}>
          <Paragraph>
            Validator {truncateInMiddle(validator)}
          </Paragraph>
          <Paragraph>
            {formatCasperAmount(staked)}
          </Paragraph>
          <Caption>
            {description}
          </Caption>
        </View>
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
