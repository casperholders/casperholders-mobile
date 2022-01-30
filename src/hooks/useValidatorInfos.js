import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';

export default function useValidatorInfos(deps = []) {
  const network = useNetwork();

  return useAsyncData(async () => {
    return await (await fetch(`${network.apiUrl}/validators/accountinfos`)).json();
  }, [network, ...deps]);
}
