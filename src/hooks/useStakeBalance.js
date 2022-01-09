import useActiveKey from '@/hooks/selectors/auth/useActiveKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useStakeBalance(deps = []) {
  const activeKey = useActiveKey();

  return useAsyncData(async () => {
    return await balanceService.fetchAllStakeBalance();
  }, [activeKey, ...deps]);
}
