import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import NftCollectionCard from '@/components/nft/NftCollectionCard';
import NftTokenSelector from '@/components/nft/NftTokenSelector';
import usePublicKey from '@/hooks/auth/usePublicKey';
import useTrackedNftTokens from '@/hooks/nft/useTrackedNftTokens';
import useNetwork from '@/hooks/useNetwork';
import fetchTokens from '@/services/tokens/fetchTokens';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';

/**
 * NFTs screen, display NFTs
 * @returns {JSX.Element}
 * @constructor
 */
export default function NFTsScreen() {
  const network = useNetwork();
  const activeKey = usePublicKey();
  const [trackedTokens, setTrackedTokens] = useState([]);

  useEffect(() => {
    (async () => {
      const trackedTokensIds = await useTrackedNftTokens(activeKey).get();
      if (trackedTokensIds && trackedTokensIds.length) {
        const { data } = await fetchTokens(network, {
          ids: trackedTokensIds,
        });

        setTrackedTokens(data);
      }
    })();
  }, [network, activeKey]);

  const changeTrackedNft = async (tokens) => {
    setTrackedTokens(tokens);
    await useTrackedNftTokens(activeKey).set(tokens.map(({ id }) => id));
  };

  const handleSelectNft = useCallback(async (token) => {
    await changeTrackedNft([token, ...trackedTokens]);
  }, [trackedTokens]);

  const handleUnselectNft = useCallback(async (token) => {
    await changeTrackedNft(trackedTokens.filter(({ id }) => id !== token.id));
  }, [trackedTokens]);

  const [myTestKey, setMyTestKey] = useState(0);

  return (
    <ScreenWrapper>
      <GridRow key={myTestKey}>
        <GridCol>
          <Button onPress={() => setMyTestKey(myTestKey+1)}>
            Reset {myTestKey}
          </Button>
        </GridCol>
        <GridCol>
          <NftTokenSelector
            notIds={trackedTokens.map(({ id }) => id)}
            onSelect={handleSelectNft}
          />
        </GridCol>
        {trackedTokens.map((token) => (
          <GridCol key={token.id}>
            <NftCollectionCard
              token={token}
              onRemove={() => handleUnselectNft(token)}
            />
          </GridCol>
        ))}
      </GridRow>
    </ScreenWrapper>
  );
}
