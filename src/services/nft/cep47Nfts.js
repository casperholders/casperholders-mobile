import { getDictionaryItemByURef } from '@/helpers/rpc';
import { concat } from '@ethersproject/bytes';
import blake from 'blakejs';
import { CLPublicKey, CLValueBuilder, CLValueParsers } from 'casper-js-sdk';

export async function fetchOwnedCep47Nfts(network, srh, token, activeKey, ownedTokens) {
  const indexes = Array.from(Array(Number(ownedTokens)).keys());

  for (let i = 0; i < indexes.length; i++) {
    const key = CLValueBuilder.key(CLPublicKey.fromHex(activeKey));
    const value = CLValueBuilder.u256(indexes[i]);
    const aBytes = CLValueParsers.toBytes(key).unwrap();
    const bBytes = CLValueParsers.toBytes(value).unwrap();
    const blaked = blake.blake2b(concat([aBytes, bBytes]), undefined, 32);
    const uref = Buffer.from(blaked).toString('hex');

    indexes[i] = getDictionaryItemByURef(network, srh, token.id, uref, 'owned_tokens_by_index')
      .then((r) => r.result?.stored_value?.CLValue?.parsed);
  }

  return Promise.all(indexes);
}
