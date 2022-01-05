import useActiveKey from '@/hooks/selectors/useActiveKey';
import useConnected from '@/hooks/selectors/useConnected';
import useAsync from '@/hooks/useAsync';
import balanceService from '@/services/balanceService';

export default function useBalance() {
  const connected = useConnected();
  const activeKey = useActiveKey();

  return useAsync(async () => {
    if (!connected) {
      throw new Error('Currently not connected');
    }

    return await balanceService.fetchBalance();
  }, [connected, activeKey]);
}
