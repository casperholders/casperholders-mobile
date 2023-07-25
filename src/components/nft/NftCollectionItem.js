import Icon from '@/components/common/Icon';
import { upperFirst } from 'lodash';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Card, DataTable, Paragraph, Text } from 'react-native-paper';

export default function NftCollectionItem({ nft }) {
  const characteristicsEntries = Array.from((nft.characteristics ?? new Map()).entries());
  const attributesEntries = Array.from((nft.attributes ?? new Map()).entries());

  const renderCharacteristic = (value) => {
    if (typeof value !== 'object' || Array.isArray(value)) {
      return /^http(s)?:\/\//.test(value.toString())
        ? <Text
          style={styles.link}
          onPress={() => Linking.openURL(value.toString())}
        >
          Link
          <Icon
            name="open-in-new"
            size={12}
          />
        </Text>
        : value.toString();
    }

    return typeof v === 'object' && v !== null
      ? <View>
        {Object.entries(v).map(([sk, sv]) => <Text key={sk}>{sk}: {sv}</Text>)}
      </View>
      : 'N/A';
  };

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
      <Card.Title title={nft.name} />
      {!!nft.description && <Card.Content>
        <Paragraph>{nft.description}</Paragraph>
      </Card.Content>}
      {!!characteristicsEntries.length && <>
        <DataTable.Header>
          <DataTable.Title>Characteristic</DataTable.Title>
          <DataTable.Title numeric>Value</DataTable.Title>
        </DataTable.Header>
        {characteristicsEntries.map(([k, v]) =>
          <DataTable.Row key={k}>
            <DataTable.Cell>{upperFirst(k.replace('_', ' '))}</DataTable.Cell>
            <DataTable.Cell numeric>
              {renderCharacteristic(v)}
            </DataTable.Cell>
          </DataTable.Row>,
        )}
      </>}
      {!!attributesEntries.length && <>
        <DataTable.Header>
          <DataTable.Title>Attribute</DataTable.Title>
          <DataTable.Title numeric>Value</DataTable.Title>
        </DataTable.Header>
        {attributesEntries.map(([k, v]) => (
          <DataTable.Row key={k}>
            <DataTable.Cell>{k}</DataTable.Cell>
            <DataTable.Cell numeric>{v}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </>}
    </Card>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
});
