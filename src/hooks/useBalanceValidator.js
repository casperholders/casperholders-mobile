import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import balanceService from '@/services/balanceService';

/**
 * Fetch stake balance of a user on a validator
 * @param deps
 * @param validator
 * @returns {[boolean,unknown,unknown]|*}
 */
export default function useBalanceValidator(deps = [], validator) {
  const activeKey = usePublicKey();
  const network = useNetwork();

  return useAsyncData(async () => {
    if (!validator) {
      return '0';
    }
    return await balanceService(network.rpcUrl).fetchStakeBalance(validator);
  }, [activeKey, network, ...deps]);
}
