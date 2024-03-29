import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import balanceService from '@/services/balanceService';
import clientCasper from '@/services/clientCasper';
import { CurrencyUtils, NoActiveKeyError, NoStakeBalanceError } from '@casperholders/core';
import Big from 'big.js';

/**
 * Generate a validator list, return only the validators whom the user is delegating to if the undelegate boolean is true
 * @param undelegate boolean
 * @returns {[boolean,unknown,unknown]|*}
 */
export default function useValidatorList(undelegate) {
  const activeKey = usePublicKey();
  const network = useNetwork();
  return useAsyncData(async () => {
    let userStake;
    let validators;
    if (undelegate) {
      try {
        userStake = await balanceService(network.rpcUrl).fetchAllStakeBalance();
      } catch (e) {
        validators = [
          { header: `Oops an error occurred : ${e}` },
        ];
        if (e instanceof NoActiveKeyError) {
          validators = [
            { header: 'Connect to a wallet to know your currents validators' },
          ];
        }
        if (e instanceof NoStakeBalanceError) {
          validators = [
            { header: 'You don\'t stake on any validators' },
          ];
        }
        return validators;
      }
    }
    let validatorsData = [];
    try {
      validatorsData = await (await fetch(`${network.apiUrl}/validators/accountinfos`)).json();
      if (undelegate && userStake) {
        validatorsData = validatorsData.filter(
          (validatorInfo) => userStake.some(
            (stake) => stake.validator.toLowerCase() === validatorInfo.publicKey.toLowerCase(),
          ),
        );
      }
    } catch (e) {
      console.log(e);
      const validatorsInfo = (await clientCasper(network.rpcUrl).casperRPC.getValidatorsInfo())
        .auction_state
        .bids;
      const validators = (await clientCasper(network.rpcUrl).casperRPC.getValidatorsInfo())
        .auction_state.era_validators;
      const currentEra = validators[0].validator_weights.map((v) => v.public_key);
      const nextEra = validators[1].validator_weights.map((v) => v.public_key);
      for (let i = 0; i < validatorsInfo.length; i++) {
        const validatorInfo = validatorsInfo[i];
        let totalStake = '0';
        if (validatorInfo.bid.delegators.length > 0) {
          totalStake = validatorInfo.bid.delegators.reduce(
            (prev, next) => ({
              staked_amount: Big(prev.staked_amount).plus(next.staked_amount).toString(),
            }),
          ).staked_amount;
        }
        totalStake = Big(totalStake).plus(validatorInfo.bid.staked_amount).toString();
        const stakedAmount = CurrencyUtils.convertMotesToCasper(totalStake);
        if (
          (undelegate
            && userStake.some(
              (stake) => stake.validator.toLowerCase() === validatorInfo.public_key.toLowerCase(),
            ))
          || !undelegate
        ) {
          validatorsData.push({
            name: validatorInfo.public_key,
            publicKey: validatorInfo.public_key,
            group: validatorInfo.bid.inactive ? 'Inactive' : 'Active',
            delegation_rate: validatorInfo.bid.delegation_rate,
            staked_amount: new Big(stakedAmount).toFixed(2),
            currentEra: currentEra.includes(validatorInfo.public_key),
            nextEra: nextEra.includes(validatorInfo.public_key),
          });
        }
      }
    }
    if (undelegate) {
      return validatorsData;
    }
    if (validatorsData.filter((validator) => validator.group === 'Active').length > 0) {
      validators = [
        { header: 'Current & next era validators' },
        ...validatorsData.filter((validator) => validator.group === 'Active' && validator.currentEra && validator.nextEra),
      ];
      const nextValidators = validatorsData.filter((validator) => validator.group === 'Active' && !validator.currentEra && validator.nextEra);
      if (nextValidators.length > 0) {
        validators.push([
          { header: 'Next era validators that will be included in the top 100' },
          ...nextValidators,
        ]);
      }
    } else {
      validators = [
        { header: 'You don\'t stake on any validators' },
      ];
    }
    return validators;
  }, [activeKey, network]);
}
