import balanceService from '@/services/balanceService';

export default async function fetchErc20Balances(network, tokens) {
  const balances = {};

  await Promise.all(tokens.map(async (token) => {
    balances[token.id] = await balanceService(network.rpcUrl).fetchBalanceOfErc20(token.id);
  }));

  return balances;
}
