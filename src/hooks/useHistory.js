import useActiveKey from '@/hooks/selectors/auth/useActiveKey';
import useAsyncData from '@/hooks/useAsyncData';
import { APP_DATA_API_URL } from '@env';

export default function useHistory(page) {
  const activeKey = useActiveKey();
  return useAsyncData(async () => {
    const response = await fetch(
      `${APP_DATA_API_URL}/deploys?from=ilike.${activeKey}&limit=10&offset=${page * 10}&order=timestamp.desc`,
      {
        method: 'GET',
        headers: new Headers({
          'Range-Unit': 'items',
          Prefer: 'count=exact',
        }),
      },
    );

    return {
      operations: await response.json(),
      total: Number(response.headers.get('content-range').replace(/^[0-9]*-[0-9]*\//, '')),
    };
  }, [activeKey, page]);
}