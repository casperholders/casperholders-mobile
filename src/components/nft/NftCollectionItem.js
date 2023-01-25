import Icon from '@/components/common/Icon';
import { upperFirst } from 'lodash';
import { Card, DataTable } from 'react-native-paper';

export default function NftCollectionItem({ nft }) {
  const characteristicsEntries = Array.from(nft.characteristics.entries());

  return (
    <Card>
      {nft.imageURL ? <Card.Cover source={{ uri: nft.imageURL }} /> : <Card.Content>
        {nft.videoURL ? <Icon
          name="video"
          size={56}
          left
        /> : <Icon
          name="image-off"
          size={56}
        />}
      </Card.Content>}
      <Card.Title
        title={nft.name}
        subtitle={nft.description}
      />
      {!!characteristicsEntries.length && <>
        <DataTable.Row>
          <DataTable.Cell>Characteristic</DataTable.Cell>
          <DataTable.Cell numeric>Value</DataTable.Cell>
        </DataTable.Row>
        {characteristicsEntries.map(([k, v]) =>
          <DataTable.Row key={k}>
            <DataTable.Cell>{upperFirst(k)}</DataTable.Cell>
            <DataTable.Cell numeric>{v}</DataTable.Cell>
          </DataTable.Row>,
        )}
      </>}
    </Card>
  );
}
