import ErrorAlert from '@/components/common/ErrorAlert';
import Loader from '@/components/common/Loader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useBalance from '@/hooks/useBalance';
import useBalanceOperation from '@/hooks/useBalanceOperation';
import useFormattedAmount from '@/hooks/useFormattedAmount';
import { Image, StyleSheet, View } from 'react-native';
import { Caption, Card, Title } from 'react-native-paper';

export default function BalanceScreen() {
  const [balanceLoading, balance, balanceError] = useBalance();
  const balanceAmount = useBalanceOperation(balanceLoading, balance, balanceError, (b) => b);
  const formattedBalanceAmount = useFormattedAmount(balanceAmount);

  return balanceLoading ? (
    <Loader />
  ) : (
    <ScreenWrapper>
      {balanceError && <ErrorAlert message={balanceError.message} />}
      <Card>
        <Card.Content>
          <View style={styles.balanceWrapper}>
            <Image
              source={require('../../assets/casper_logo.png')}
              style={styles.balanceCasperLogo}
            />
            <View>
              <Title>
                {formattedBalanceAmount}
              </Title>
              <Caption>
                Your CSPR funds
              </Caption>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  balanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceCasperLogo: {
    marginRight: 8,
    width: 42,
    height: 42,
  },
});
