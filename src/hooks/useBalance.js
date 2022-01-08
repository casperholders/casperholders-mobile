import useActiveKey from '@/hooks/selectors/useActiveKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useBalance() {
  const activeKey = useActiveKey();

  return useAsyncData(async () => {
    return await balanceService.fetchBalance();
  }, [activeKey]);
}
