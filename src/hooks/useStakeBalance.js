import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import balanceService from '@/services/balanceService';

/**
 * Retrieve stake balance of the user from the balance service
 * @param deps
 * @returns {[boolean,unknown,unknown]|*}
 */
export default function useStakeBalance(deps = []) {
  const activeKey = usePublicKey();
  const network = useNetwork();

  return useAsyncData(async () => {
    return await balanceService(network.rpcUrl).fetchAllStakeBalance();
  }, [activeKey, network, ...deps]);
}
