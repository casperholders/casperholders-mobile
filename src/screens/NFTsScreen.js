import CardLoader from '@/components/common/CardLoader';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import NftCollectionCard from '@/components/nft/NftCollectionCard';
import NftTokenSelector from '@/components/nft/NftTokenSelector';
import usePublicKey from '@/hooks/auth/usePublicKey';
import useTrackedNftTokens from '@/hooks/nft/useTrackedNftTokens';
import useNetwork from '@/hooks/useNetwork';
import fetchTokens from '@/services/tokens/fetchTokens';
import { range } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Subheading } from 'react-native-paper';

/**
 * NFTs screen, display NFTs
 * @returns {JSX.Element}
 * @constructor
 */
export default function NFTsScreen() {
  const network = useNetwork();
  const activeKey = usePublicKey();
  const [loading, setLoading] = useState(true);
  const [trackedTokens, setTrackedTokens] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const trackedTokensIds = await useTrackedNftTokens(activeKey).get();
      if (trackedTokensIds && trackedTokensIds.length) {
        const { data } = await fetchTokens(network, {
          ids: trackedTokensIds,
        });

        setTrackedTokens(data);
      }

      setLoading(false);
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

  return (
    <ScreenWrapper>
      <GridRow>
        <GridCol>
          <NftTokenSelector
            notIds={trackedTokens.map(({ id }) => id)}
            onSelect={handleSelectNft}
          />
        </GridCol>
        {loading && range(3).map((i) => (
          <GridCol key={i}>
            <CardLoader height={56} />
          </GridCol>
        ))}
        {!loading && trackedTokens.map((token) => (
          <GridCol key={token.id}>
            <NftCollectionCard
              token={token}
              onRemove={() => handleUnselectNft(token)}
            />
          </GridCol>
        ))}
        {!loading && !trackedTokens.length && <GridCol>
          <Subheading style={styles.noData}>
            No tracked NFTs collection for now.
          </Subheading>
        </GridCol>}
      </GridRow>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  noData: {
    textAlign: 'center',
  },
});
