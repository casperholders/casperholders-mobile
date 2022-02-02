import CardWithIcons from '@/components/common/CardWithIcons';
import ValidatorIcon from '@/components/common/ValidatorIcon';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import truncateInMiddle from '@/helpers/truncateInMiddle';
import useAdapter from '@/hooks/auth/useAdapter';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { StyleSheet, View } from 'react-native';
import { Button, Caption, Paragraph, useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  const adapter = useAdapter();
  const readOnly = adapter.constructor.ID === ReadOnlyAdapter.ID;
  const description = `${formattedPercentOfTotal}% of your staked funds - ${delegationRate}% fee`;

  return (
    <CardWithIcons
      style={styles.card}
      left={image !== undefined && <ValidatorIcon
        style={styles.cardIcon}
        url={image}
        size={35}
        left
      />}
    >
      <View>
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
      <View style={styles.cardActions}>
        <Button
          style={styles.cardActionsStake}
          color={theme.colors.text}
          disabled={readOnly}
          onPress={() => navigation.jumpTo('OperationsTab', {
            screen: 'Stake',
            address: validator,
            initial: false,
          })}
        >
          Stake
        </Button>
        <Button
          color={theme.colors.text}
          disabled={readOnly}
          onPress={() => navigation.jumpTo('OperationsTab', {
            screen: 'Unstake',
            address: validator,
            initial: false,
          })}
        >
          Unstake
        </Button>
      </View>
    </CardWithIcons>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 12,
    marginBottom: 12,
  },
  cardIcon: {
    marginBottom: 'auto',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cardActionsStake: {
    marginRight: 8,
  },
});
