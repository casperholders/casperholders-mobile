import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import fetchErc20AccountTokensIds from '@/services/tokens/fetchErc20AccountTokensIds';
import fetchErc20Balances from '@/services/tokens/fetchErc20Balances';
import fetchTokens from '@/services/tokens/fetchTokens';
import Big from 'big.js';

/**
 * Fetch ERC20 tokens of the user
 * @param deps
 * @returns {[boolean,unknown,unknown]|*}
 */
export default function useErc20Balances(deps = []) {
  const network = useNetwork();
  const activeKey = usePublicKey();

  return useAsyncData(async () => {
    const data = { tokens: [], balances: {} };
    const accountTokensIds = await fetchErc20AccountTokensIds(network, activeKey);
    if (accountTokensIds.length === 0) {
      return data;
    }

    // FIXME Account with more than 100 tokens will be limited to display all tokens.
    // FIXME Solution: add a button to "Load more" tokens (and sort API query).
    data.tokens = (await fetchTokens(network, { ids: accountTokensIds })).data;
    data.balances = await fetchErc20Balances(network, data.tokens);

    data.tokens.sort(
      (t1, t2) => Big(data.balances[t2.id] || 0).cmp(Big(data.balances[t1.id] || 0)),
    );

    return data;
  }, [activeKey, network, ...deps]);
}
