import { getDictionaryItemByURef } from '@/helpers/rpc';

function replaceIpfs(str) {
  return str.replace('ipfs://', 'https://w3s.link/ipfs/')
    .replace('https://ipfs.io/ipfs/', 'https://w3s.link/ipfs/');
}

async function parseTokenUri(nft, key) {
  if (nft.metadata.get(key)) {
    try {
      const data = await (await fetch(replaceIpfs(nft.metadata.get(key)))).json();
      if (key === 'asset') {
        nft.metadata.delete('asset');
      }
      return new Map(
        [...nft.metadata, ...new Map(Object.entries(data))],
      );
    } catch {
      // Ignore error
    }
  }
  return nft.metadata;
}

export default async function retrieveNft(network, stateRootHash, contractKey, uref, metadataUref, isCep78) {
  try {
    const r = await getDictionaryItemByURef(network, stateRootHash, contractKey, uref, metadataUref);
    if (r.result?.stored_value?.CLValue?.parsed) {
      const nft = {};
      if (isCep78) {
        const burn = await getDictionaryItemByURef(network, stateRootHash, contractKey, uref, 'burnt_tokens');
        nft.burn = burn.result?.stored_value?.CLValue?.cl_type === 'Unit';
      }
      const data = r.result?.stored_value?.CLValue?.parsed;
      try {
        const parsed = JSON.parse(data);
        nft.metadata = new Map(Object.entries(parsed));
      } catch {
        nft.metadata = data;
      }
      if (nft.metadata[0]?.key && nft.metadata[0]?.value) {
        nft.metadata = new Map(
          nft.metadata.map((o) => [o.key, o.value]),
        );
      }
      if (nft.metadata instanceof Map) {
        if (nft.metadata.get('description')) {
          try {
            const traits = JSON.parse(nft.metadata.get('description'));
            nft.metadata.delete('description');
            nft.metadata.set('attributes', new Map(Object.entries(traits)));
          } catch {
            // Ignore error
          }
        }

        const allMetadata = await Promise.all([
          parseTokenUri(nft, 'token_uri'),
          parseTokenUri(nft, 'ipfs_metadata_url'),
          nft.metadata.get('asset') && nft.metadata.get('asset')
            .match(/\.json$/)
            ? parseTokenUri(nft, 'asset')
            : nft.metadata,
        ]);
        nft.metadata = allMetadata.reduce((newMetadata, metadata) => new Map(
          [...newMetadata, ...metadata],
        ), nft.metadata);
        if (typeof nft.metadata.get('properties') === 'object') {
          const propMeta = new Map(Object.entries(nft.metadata.get('properties')));
          nft.metadata.delete('properties');
          nft.metadata = new Map([...nft.metadata, ...propMeta]);
        }
      }
      if (nft.metadata.get('attributes') && Array.isArray(nft.metadata.get('attributes'))) {
        nft.metadata.set('attributes', new Map(
          nft.metadata.get('attributes')
            .map(
              (attr) => [attr.trait_type, attr.value],
            ),
        ));
      }
      if (typeof nft.metadata === 'string' || nft.metadata instanceof String) {
        nft.metadata = new Map([['name', nft.metadata]]);
      }
      return nft;
    }
  } catch (error) {
    // Ignore error
  }
  return undefined;
}
