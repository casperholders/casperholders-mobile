import { CLPublicKey } from 'casper-js-sdk';

export default async function fetchErc20AccountTokensIds(network, activeKey) {
  const response = await fetch(
    `${network.dataApiUrl}/rpc/account_ercs20?publickey=${activeKey}&accounthash=${CLPublicKey.fromHex(activeKey).toAccountHashStr()}`,
  );

  return (await response.json()).map((contractHash) => contractHash.contract_hash);
}
