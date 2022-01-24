import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useStakeBalance(deps = []) {
  const activeKey = usePublicKey();

  return useAsyncData(async () => {
    return await balanceService.fetchAllStakeBalance();
  }, [activeKey, ...deps]);
}
