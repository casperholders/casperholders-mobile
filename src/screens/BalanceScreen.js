import BalanceCard from '@/components/balance/BalanceCard';
import ErrorAlert from '@/components/common/ErrorAlert';
import Icon from '@/components/common/Icon';
import Loader from '@/components/common/Loader';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import truncateInMiddle from '@/helpers/truncateInMiddle';
import useBalance from '@/hooks/useBalance';
import useStakeBalance from '@/hooks/useStakeBalance';
import Big from 'big.js';
import { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Caption, Card, Paragraph, Subheading, Title } from 'react-native-paper';

export default function BalanceScreen() {
  const [balanceLoading, balance, balanceError] = useBalance();
  const [stakeLoading, validators, stakeError] = useStakeBalance();

  const loading = balanceLoading || stakeLoading;
  const error = balanceError || stakeError;

  const stakeData = useMemo(() => {
    if (!validators) {
      return undefined;
    }

    const stakes = [];
    let totalFees = Big(0);
    let totalStaked = Big(0);
    validators.forEach(({ validator, stakedTokens }) => {
      stakes.push({
        validator,
        staked: stakedTokens,
        delegationRate: validator.delegation_rate || 0,
      });

      totalStaked = totalStaked.plus(stakedTokens);
      totalFees = totalFees.plus(validator.delegation_rate || 0);
    });

    return {
      totalStaked: totalStaked.toString(),
      averageDelegationRate: totalFees.div(validators.length || 1).toString(),
      stakes: stakes.map((stake) => ({
        ...stake,
        percentOfTotal: Big(stake.staked).div(totalStaked).times(100).toFormat(1),
      })),
    };
  }, [validators]);

  const totalFunds = useMemo(() => {
    return Big(balance || 0).plus(stakeData?.totalStaked || 0);
  }, [balance, stakeData]);

  return loading ? <Loader /> : (
    <ScreenWrapper>
      {error && <ErrorAlert message={error.message} />}
      <GridRow>
        <GridCol>
          <BalanceCard
            left={<Image
              source={require('../../assets/casper_logo.png')}
              style={styles.balanceCasperLogo}
            />}
          >
            <Title>
              {formatCasperAmount(totalFunds)}
            </Title>
            <Caption>
              Total CSPR funds
            </Caption>
          </BalanceCard>
        </GridCol>
        {stakeData?.totalStaked && (
          <>
            <GridCol style={{ flexDirection: 'row' }}>
              <Title>
                Details
              </Title>
            </GridCol>
            <GridCol>
              <BalanceCard
                left={<Icon
                  name="lock-open"
                  size={24}
                  left
                />}
              >
                <Subheading>
                  {formatCasperAmount(balance)}
                </Subheading>
                <Caption>
                  Unstaked CSPR funds
                </Caption>
              </BalanceCard>
            </GridCol>
            <GridCol>
              <BalanceCard
                left={<Icon
                  name="safe"
                  size={24}
                  left
                />}
              >
                <Subheading>
                  {formatCasperAmount(stakeData.totalStaked)}
                </Subheading>
                <Caption>
                  Total staked CSPR funds
                </Caption>
              </BalanceCard>
            </GridCol>
            <GridCol>
              {stakeData.stakes.map(({
                                       validator,
                                       staked,
                                       percentOfTotal,
                                       delegationRate,
                                     }, index) => (
                <Card
                  key={index}
                  style={{ marginLeft: 12, marginBottom: 12 }}
                >
                  <Card.Content>
                    <Paragraph>
                      {formatCasperAmount(staked)}
                    </Paragraph>
                    <Caption>
                      {percentOfTotal}% of your staked funds
                    </Caption>
                    <Caption>
                      Validator {truncateInMiddle(validator)}
                    </Caption>
                  </Card.Content>
                </Card>
              ))}
            </GridCol>
          </>
        )}
      </GridRow>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  balanceCasperLogo: {
    marginRight: 8,
    width: 42,
    height: 42,
  },
});
