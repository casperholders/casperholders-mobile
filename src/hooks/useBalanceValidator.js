import usePublicKey from '@/hooks/selectors/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import balanceService from '@/services/balanceService';

export default function useBalanceValidator(deps = [], validator) {
  const activeKey = usePublicKey();
  return useAsyncData(async () => {
    if (!validator) {
      return '0';
    }
    return await balanceService.fetchStakeBalance(validator);
  }, [activeKey, ...deps]);
}
