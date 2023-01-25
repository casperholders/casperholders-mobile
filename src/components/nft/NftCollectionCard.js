import CardLoader from '@/components/common/CardLoader';
import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import NftCollectionItem from '@/components/nft/NftCollectionItem';
import useNfts from '@/hooks/nft/useNfts';
import { range } from 'lodash';
import { useMemo, useState } from 'react';
import { Button, Subheading, useTheme } from 'react-native-paper';

export default function NftCollectionCard({ token, onRemove }) {
  const theme = useTheme();
  const {
    loading,
    error,
    more,
    nfts,
    handleLoadMore,
  } = useNfts(token);

  const [opened, setOpened] = useState(false);

  const icon = useMemo(() => (
    <Icon
      name={opened ? 'chevron-up' : 'chevron-down'}
      size={24}
      right
    />
  ), [opened]);

  const onToggleOpened = useMemo(() => () => setOpened(!opened), [opened]);

  return (
    <>
      <CardWithIcons
        left={<Icon
          name="image"
          size={24}
          left
        />}
        right={icon}
        onPress={onToggleOpened}
      >
        <Subheading style={{ fontWeight: 'bold' }}>
          {token.name ?? token.id}
        </Subheading>
      </CardWithIcons>
      {opened && <GridCol>
        <Button
          style={{ marginBottom: 12 }}
          color={theme.colors.error}
          icon="delete"
          mode="contained"
          onPress={onRemove}
        >
          Remove collection
        </Button>
        {error ? <Subheading>
          {error.message || 'Could not fetched tokens. Make sure that you\'re connected to internet.'}
        </Subheading> : <>
          {loading && !nfts?.length && <GridRow>
            {range(3).map((i) => (
              <GridCol key={i}>
                <CardLoader height={56} />
              </GridCol>
            ))}
          </GridRow>}
          {!loading && !nfts?.length ? <Subheading>
            You don't have any NFTs in this collection.
          </Subheading> : <GridRow>
            {nfts.map((nft, index) => (
              <GridCol key={index}>
                <NftCollectionItem nft={nft} />
              </GridCol>
            ))}
            {more && <GridCol>
              <Button
                loading={loading}
                mode="contained"
                onPress={handleLoadMore}
              >
                Load more
              </Button>
            </GridCol>}
          </GridRow>}
        </>}
      </GridCol>}
    </>
  );
}
