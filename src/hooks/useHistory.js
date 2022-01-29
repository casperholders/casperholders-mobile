import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';

export default function useHistory(page, additionalQuery) {
  const activeKey = usePublicKey();
  const network = useNetwork();
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
      `${network.dataApiUrl}/deploys?${query.join('&')}`,
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
  }, [activeKey, network, page, additionalQuery]);
}
