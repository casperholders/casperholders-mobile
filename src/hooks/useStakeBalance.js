import useActiveKey from '@/hooks/selectors/useActiveKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useStakeBalance() {
  const activeKey = useActiveKey();

  return useAsyncData(async () => {
    return await balanceService.fetchAllStakeBalance();
  }, [activeKey]);
}
