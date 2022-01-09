import useActiveKey from '@/hooks/selectors/auth/useActiveKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useBalance(deps = []) {
  const activeKey = useActiveKey();

  return useAsyncData(async () => {
    return await balanceService.fetchBalance();
  }, [activeKey, ...deps]);
}
