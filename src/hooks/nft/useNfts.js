import { getStateRootHash } from '@/helpers/rpc';
import usePublicKey from '@/hooks/auth/usePublicKey';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import { fetchCep78IdentifierMode } from '@/services/nft/cep78Nfts';
import fetchOwnedNfts from '@/services/nft/fetchOwnedNfts';
import parseNft from '@/services/nft/parseNft';
import retrieveNft from '@/services/nft/retrieveNft';
import { useState } from 'react';

export default function useNfts(token) {
  const ITEMS_PER_PAGE = 10;

  const network = useNetwork();
  const activeKey = usePublicKey();
  const [nfts, setNfts] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);

  const [ownedLoading, ownedNfts, ownedError] = useAsyncData(async () => {
    if (token.groupId !== 'nftcep47' && token.groupId !== 'nftcep78') {
      throw new Error('Sorry, this NFTs Collection is not supported yet.');
    }

    const srh = await getStateRootHash(network);

    if (token.groupId === 'nftcep78') {
      const identifierMode = await fetchCep78IdentifierMode(network, srh, token);
      if (identifierMode === 1) {
        throw new Error('Sorry, CEP78 NFTs Collections that use the Hash Identifier Mode aren\'t supported yet.');
      }
    }

    return await fetchOwnedNfts(network, srh, token, activeKey);
  }, [network, activeKey]);

  const [nftLoading, , nftError] = useAsyncData(async () => {
    const total = ownedNfts?.length || 0;
    if (total === 0) {
      setMore(false);

      return;
    }

    if (page === 1) {
      setNfts([]);
    }

    const srh = await getStateRootHash(network);

    const offset = (page - 1) * ITEMS_PER_PAGE;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    setNfts([
      ...nfts,
      ...(await Promise.all(Array.from(Array(Math.min(ITEMS_PER_PAGE, total - offset))).map(
        async (_, index) => {
          const ownedNft = ownedNfts[offset + index];
          const nft = await retrieveNft(
            network,
            srh,
            token.id,
            `${ownedNft}`,
            token.groupId === 'nftcep47' ? 'metadata' : token.metadata,
            token.groupId === 'nftcep78',
          );
          if (nft) {
            nft.token_id = ownedNft;

            return parseNft(nft);
          }

          return undefined;
        },
      ))).filter((nft) => nft),
    ]);
    setMore(totalPages > page);
  }, [ownedNfts, page]);

  const handleLoadMore = () => {
    if (more && !nftLoading) {
      setPage(page + 1);
    }
  };

  return {
    loading: ownedLoading || nftLoading,
    error: ownedError || nftError,
    more,
    nfts,
    handleLoadMore,
  };
}
