import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import balanceService from '@/services/balanceService';

export default function useBalance(deps = []) {
  const activeKey = usePublicKey();
  const network = useNetwork();
  return useAsyncData(async () => {
    return await balanceService(network.rpcUrl).fetchBalance();
  }, [activeKey, network, ...deps]);
}
