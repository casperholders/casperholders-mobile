import BalanceLoaderOrAmount from '@/components/balance/BalanceLoaderOrAmount';
import StakeBalanceCard from '@/components/balance/StakeBalanceCard';
import Alert from '@/components/common/Alert';
import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import SectionHeading from '@/components/common/SectionHeading';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useAdapter from '@/hooks/auth/useAdapter';
import useBalance from '@/hooks/useBalance';
import useNetwork from '@/hooks/useNetwork';
import useStakeBalance from '@/hooks/useStakeBalance';
import useUniqueKey from '@/hooks/useUniqueKey';
import useValidatorInfos from '@/hooks/useValidatorInfos';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { NoStakeBalanceError } from '@casperholders/core/dist/services/errors/noStakeBalanceError';
import Big from 'big.js';
import { orderBy } from 'lodash';
import { useMemo, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Caption, Subheading } from 'react-native-paper';

export default function BalanceScreen({ navigation }) {
  const [uniqueKey, updateUniqueKey] = useUniqueKey();
  const network = useNetwork();
  const [balanceLoading, balance, balanceError] = useBalance([uniqueKey, network]);
  const [stakeLoading, validators, stakeError] = useStakeBalance([uniqueKey, network]);
  const [validatorsInfoLoading, validatorsInfo, validatorsInfoError] = useValidatorInfos([]);
  const adapter = useAdapter();
  const readOnly = adapter.constructor.ID === ReadOnlyAdapter.ID;
  const loading = balanceLoading || stakeLoading;
  const error = balanceError || (
    stakeError instanceof NoStakeBalanceError ? undefined : stakeError
  );

  const [stakeDetails, setStakeDetails] = useState(false);
  const stakeData = useMemo(() => {
    if (!validators) {
      return undefined;
    }

    const stakes = [];
    let totalFees = Big(0);
    let totalStaked = Big(0);
    validators.forEach(({ validator, stakedTokens }) => {
      const validatorInfo = validatorsInfo.filter((v) => v.publicKey === validator);
      let image = undefined;
      let delegationRate = 0;
      if (validatorInfo.length > 0) {
        validator = validatorInfo[0].name;
        image = validatorInfo[0].png;
        delegationRate = validatorInfo[0].delegation_rate;
      }
      stakes.push({
        validator,
        staked: stakedTokens,
        image,
        delegationRate,
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

  const handleDetailsStakeToggle = detailsStake ? () => {
    setStakeDetails(!stakeDetails);
  } : undefined;

  return (
    <ScreenWrapper onRefresh={updateUniqueKey}>
      {error && <Alert
        type="error"
        message={error.message}
      />}
      <GridRow>
        <GridCol>
          <CardWithIcons
            left={<Icon
              name={'network'}
              size={24}
              style={styles.network}
            />}
          >
            <Subheading style={{ fontWeight: 'bold' }}>Network : {network.name}</Subheading>
          </CardWithIcons>
        </GridCol>
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
            onPress={handleDetailsStakeToggle}
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
          {readOnly &&
            <Alert
              type="info"
              message="You are in Read Only mode. You can't make any operations."
            />
          }
          {stakeData.stakes.map((stake, index) => <StakeBalanceCard
            key={index}
            navigation={navigation}
            {...stake}
          />)}
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
  network: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
});
