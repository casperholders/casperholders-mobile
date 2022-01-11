import StakeBalanceCard from '@/components/balance/StakeBalanceCard';
import Alert from '@/components/common/Alert';
import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useBalance from '@/hooks/useBalance';
import useStakeBalance from '@/hooks/useStakeBalance';
import useUniqueKey from '@/hooks/useUniqueKey';
import Big from 'big.js';
import { orderBy } from 'lodash';
import { useMemo, useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Image, StyleSheet } from 'react-native';
import { Caption, Subheading, Title } from 'react-native-paper';

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

  const detailsStake = useMemo(() => {
    if (stakeData?.stakes?.length > 0) {
      return <Icon
        name={stakeDetails ? 'chevron-up' : 'chevron-down'}
        size={24}
        right
      />;
    }
    return <></>;
  }, [stakeData]);

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
            <Title>
              {loading ? (<ContentLoader
                  speed={1}
                  width={100}
                  height={25}
                  viewBox="0 0 150 25"
                  backgroundColor="#00126b"
                  foregroundColor="#000e55"
                >
                  <Rect
                    x="0"
                    y="7"
                    rx="3"
                    ry="3"
                    width="150"
                    height="25"
                  />
                </ContentLoader>) :
                (formatCasperAmount(totalFunds))
              }
            </Title>
            <Caption>
              Total CSPR funds
            </Caption>
          </CardWithIcons>
        </GridCol>
        <GridCol>
          <Subheading style={{ textAlign: 'center' }}>
            Details
          </Subheading>
        </GridCol>
        <GridCol>
          <CardWithIcons
            left={<Icon
              name="lock-open"
              size={24}
              left
            />}
          >
            <Subheading>
              {balanceLoading ? (<ContentLoader
                  speed={1}
                  width={100}
                  height={25}
                  viewBox="0 0 150 25"
                  backgroundColor="#00126b"
                  foregroundColor="#000e55"
                >
                  <Rect
                    x="0"
                    y="7"
                    rx="3"
                    ry="3"
                    width="150"
                    height="25"
                  />
                </ContentLoader>) :
                (formatCasperAmount(balance))
              }
            </Subheading>
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
            <Subheading>
              {stakeLoading ? (<ContentLoader
                  speed={1}
                  width={100}
                  height={25}
                  viewBox="0 0 150 25"
                  backgroundColor="#00126b"
                  foregroundColor="#000e55"
                >
                  <Rect
                    x="0"
                    y="7"
                    rx="3"
                    ry="3"
                    width="150"
                    height="25"
                  />
                </ContentLoader>) :
                (formatCasperAmount(stakeData?.totalStaked ? stakeData?.totalStaked : '0'))
              }
            </Subheading>
            <Caption>
              Total staked CSPR funds
            </Caption>
          </CardWithIcons>
        </GridCol>
        {stakeDetails && <GridCol>
          {stakeData.stakes.map((stake, index) =>
            <StakeBalanceCard key={index} {...stake} />)}
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
