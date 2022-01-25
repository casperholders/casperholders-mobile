import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import { APP_DATA_API_URL } from '@env';

export default function useHistory(page, additionalQuery) {
  const activeKey = usePublicKey();
  return useAsyncData(async () => {
    const query = [
      `from=ilike.${activeKey}`,
      'limit=10',
      `offset=${page * 10}`,
      'order=timestamp.desc',
    ];

    if (additionalQuery) {
      query.push(additionalQuery);
    }

    const response = await fetch(
      `${APP_DATA_API_URL}/deploys?${query.join('&')}`,
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
      total: Number(response.headers.get('content-range').replace(/^.*\//, '')),
    };
  }, [activeKey, page, additionalQuery]);
}
