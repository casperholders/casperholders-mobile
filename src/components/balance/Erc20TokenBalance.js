import CardWithIcons from '@/components/common/CardWithIcons';
import ValidatorIcon from '@/components/common/ValidatorIcon';
import computeFormattedTokenValue from '@/services/tokens/computeFormattedTokenValue';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';

export default function Erc20TokenBalance({ token, balance }) {
  const amount = computeFormattedTokenValue(balance, token);

  return (
    <CardWithIcons
      testID={`erc20Balance${token.id}`}
      style={styles.card}
      left={token.logo !== undefined && <ValidatorIcon
        style={styles.cardIcon}
        url={token.logo}
        size={35}
        left
      />}
    >
      <View>
        <Paragraph>
          {token.name}
        </Paragraph>
        <Paragraph style={{ fontWeight: 'bold' }}>
          {amount.value}
        </Paragraph>
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
});
