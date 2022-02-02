import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';

/**
 * Retrieve validator metadata from the casperholders api
 * @param deps
 * @returns {[boolean,unknown,unknown]|*}
 */
export default function useValidatorInfos(deps = []) {
  const network = useNetwork();

  return useAsyncData(async () => {
    return await (await fetch(`${network.apiUrl}/validators/accountinfos`)).json();
  }, [network, ...deps]);
}
