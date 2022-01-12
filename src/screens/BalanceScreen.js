import BalanceLoaderOrAmount from '@/components/balance/BalanceLoaderOrAmount';
import StakeBalanceCard from '@/components/balance/StakeBalanceCard';
import Alert from '@/components/common/Alert';
import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import SectionHeading from '@/components/common/SectionHeading';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useBalance from '@/hooks/useBalance';
import useStakeBalance from '@/hooks/useStakeBalance';
import useUniqueKey from '@/hooks/useUniqueKey';
import Big from 'big.js';
import { orderBy } from 'lodash';
import { useMemo, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Caption } from 'react-native-paper';

export default function BalanceScreen() {
  const [uniqueKey, updateUniqueKey] = useUniqueKey();
  const [balanceLoading, balance, balanceError] = useBalance([uniqueKey]);
  const [stakeLoading, validators, stakeError] = useStakeBalance([uniqueKey]);

  const loading = balanceLoading || stakeLoading;
  const error = balanceError || stakeError;

  const [stakeDetails, setStakeDetails] = useState(false);
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
      stakes: orderBy(stakes.map((stake) => {
        const percentOfTotal = Big(stake.staked).div(totalStaked).times(100);

        return {
          ...stake,
          percentOfTotal: percentOfTotal.toNumber(),
          formattedPercentOfTotal: percentOfTotal.toFormat(1),
        };
      }), ['percentOfTotal'], ['desc']),
    };
  }, [validators]);

  const totalFunds = useMemo(() => {
    return Big(balance || 0).plus(stakeData?.totalStaked || 0);
  }, [balance, stakeData]);

  const detailsStake = useMemo(() => (
    stakeData?.stakes?.length > 0 && <Icon
      name={stakeDetails ? 'chevron-up' : 'chevron-down'}
      size={24}
      right
    />
  ), [stakeData]);

  return (
    <ScreenWrapper onRefresh={updateUniqueKey}>
      {error && <Alert
        type="error"
        message={error.message}
      />}
      <GridRow>
        <GridCol>
          <CardWithIcons
            left={<Image
              source={require('../../assets/casper_logo.png')}
              style={styles.balanceCasperLogo}
            />}
          >
            <BalanceLoaderOrAmount
              loading={loading}
              amount={totalFunds}
              style={{ fontWeight: 'bold' }}
            />
            <Caption>
              Total CSPR funds
            </Caption>
          </CardWithIcons>
        </GridCol>
        <SectionHeading title="Details" />
        <GridCol>
          <CardWithIcons
            left={<Icon
              name="lock-open"
              size={24}
              left
            />}
          >
            <BalanceLoaderOrAmount
              loading={balanceLoading}
              amount={balance}
            />
            <Caption>
              Unstaked CSPR funds
            </Caption>
          </CardWithIcons>
        </GridCol>
        <GridCol>
          <CardWithIcons
            onPress={() => setStakeDetails(!stakeDetails)}
            left={<Icon
              name="safe"
              size={24}
              left
            />}
            right={detailsStake}
          >
            <BalanceLoaderOrAmount
              loading={stakeLoading}
              amount={stakeData?.totalStaked || '0'}
            />
            <Caption>
              Total staked CSPR funds
            </Caption>
          </CardWithIcons>
        </GridCol>
        {stakeDetails && <GridCol>
          {stakeData?.stakes?.map((stake, index) => <StakeBalanceCard key={index} {...stake} />)}
        </GridCol>}
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
