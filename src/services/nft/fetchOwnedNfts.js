import { getDictionaryItemByURef } from '@/helpers/rpc';
import { fetchOwnedCep47Nfts } from '@/services/nft/cep47Nfts';
import { CLPublicKey } from 'casper-js-sdk';

export default async function fetchOwnedNfts(network, srh, token, activeKey) {
  const uref = CLPublicKey.fromHex(activeKey).toAccountHashStr().slice(13);
  const ownedTokens = await getDictionaryItemByURef(network, srh, token.id, uref, token.groupId === 'nftcep47' ? 'balances' : 'owned_tokens');
  if (ownedTokens.result?.stored_value?.CLValue?.parsed) {
    if (typeof ownedTokens.result?.stored_value?.CLValue?.parsed === 'string') {
      return fetchOwnedCep47Nfts(network, srh, token, activeKey, ownedTokens.result.stored_value.CLValue.parsed);
    }

    return ownedTokens.result?.stored_value?.CLValue?.parsed;
  }

  return [];
}
