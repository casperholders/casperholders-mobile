import useActiveKey from '@/hooks/selectors/auth/useActiveKey';
import useAsyncData from '@/hooks/useAsyncData';
import { DATA_API } from '@env';

export default function useHistory(deps = []) {
  const activeKey = useActiveKey();
  return useAsyncData(async () => {
    const response = await fetch(`${DATA_API}/deploys?from=ilike.${activeKey}&limit=10&offset=${deps[0]*10}&order=timestamp.desc`, {
      method: 'GET',
      headers: new Headers({
        'Range-Unit': 'items',
        Prefer: 'count=exact',
      }),
    });
    return {
      operations: await response.json(),
      total: Number(response.headers.get('content-range').replace(/^[0-9]*-[0-9]*\//, ''))
    };
  }, [activeKey, ...deps]);
}
