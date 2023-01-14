import Alert from '@/components/common/Alert';
import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import GridCol from '@/components/grid/GridCol';
import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, DataTable, Paragraph } from 'react-native-paper';

/**
 * NFTs screen, display NFTs
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export default function CollectionCard({ tokenID }) {

  const [collectionDetails, setCollectionDetails] = useState(false);

  const collectionData = useMemo(() => {
    return {
      nfts: [
        {
          uri: 'https://picsum.photos/700',
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          characteristics: {
            testKey: 'testValue',
            testKey2: 'testValue2',
            testKey3: 'testValue3',
            testKey4: 'testValue4',
          },
        },
        {
          uri: 'https://picsum.photos/700',
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          characteristics: {
            testKey: 'testValue',
            testKey2: 'testValue2',
            testKey3: 'testValue3',
            testKey4: 'testValue4',
          },
        },
      ],
    };
  }, []);

  const detailsCollection = useMemo(() => (
    collectionData?.nfts?.length > 0 && <Icon
      name={collectionDetails ? 'chevron-up' : 'chevron-down'}
      size={24}
      right
    />
  ), [collectionData, collectionDetails]);

  const handleDetailsCollectionToggle = detailsCollection ? () => {
    console.log(collectionDetails);
    setCollectionDetails(!collectionDetails);
  } : undefined;

  return (<>
      <CardWithIcons
        style={styles.operationsDescription}
        onPress={handleDetailsCollectionToggle}
        left={<Icon
          name="image"
          size={24}
          left
        />}
        right={detailsCollection}
        testID="detailsCollection"
      >
        <Paragraph>
          Collection Name {tokenID}
        </Paragraph>
      </CardWithIcons>
      {collectionDetails && <GridCol>
        {collectionData.nfts.length === 0 &&
          <Alert
            type="info"
            message="You don't have any NFTs in this collection."
          />
        }
        <Button
          style={styles.operationsDescription}
          icon="delete"
          mode="contained"
          color="red"
          onPress={() => {
          }}
        >
          Remove collection
        </Button>
        {collectionData.nfts.map((nft, index) => <Card
          style={styles.operationsDescription}
          key={tokenID + index}
        >
          <Card.Cover source={{ uri: nft.uri }} />
          <Card.Title
            title={nft.title}
            subtitle={nft.subtitle}
          />
          <Card.Content>
            {Object.entries(nft.characteristics).map(([k, v]) =>
              <DataTable.Row>
                <DataTable.Cell>{k}</DataTable.Cell>
                <DataTable.Cell numeric>{v}</DataTable.Cell>
              </DataTable.Row>,
            )}
          </Card.Content>
        </Card>)}
      </GridCol>}
    </>
  );
}

const styles = StyleSheet.create({
  operationsDescription: {
    marginBottom: 12,
  },
});
