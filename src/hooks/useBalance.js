import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useBalance(deps = []) {
  const activeKey = usePublicKey();

  return useAsyncData(async () => {
    return await balanceService.fetchBalance();
  }, [activeKey, ...deps]);
}
