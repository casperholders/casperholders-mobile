import CardWithIcons from '@/components/common/CardWithIcons';
import SectionHeading from '@/components/common/SectionHeading';
import ValidatorIcon from '@/components/common/ValidatorIcon';
import usePublicKey from '@/hooks/auth/usePublicKey';
import usePasteHandler from '@/hooks/inputs/usePasteHandler';
import useAsyncData from '@/hooks/useAsyncData';
import useNetwork from '@/hooks/useNetwork';
import fetchTokens from '@/services/tokens/fetchTokens';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Portal, Text, TextInput, useTheme } from 'react-native-paper';

export default function NftTokenSelector({ notIds, onSelect, style }) {
  const snapPoints = ['25%', '50%', '90%'];

  const theme = useTheme();
  const network = useNetwork();
  const activeKey = usePublicKey();

  const sheetRef = useRef(null);

  const [search, setSearch] = useState('');

  const [tokensLoading, tokens, tokensError] = useAsyncData(async () => {
    const { data } = await fetchTokens(network, {
      notIds,
      search,
      limit: 10,
      tokenTypes: ['nftcep78', 'nftcep47'],
    });

    return data;
  }, [network, activeKey, search]);

  const handlePaste = usePasteHandler(setSearch);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleSelectPress = useCallback((token) => {
    onSelect(token);
    setSearch('');
    if (typeof sheetRef.current?.close === 'function') {
      sheetRef.current?.close();
    }
  }, [onSelect]);

  const renderItem = (item, index) => (
    <React.Fragment key={index}>
      <CardWithIcons
        testID={item.id}
        left={item.logo ? <ValidatorIcon
          url={item.logo}
          size={35}
          left
        /> : undefined}
        onPress={() => handleSelectPress(item)}
      >
        <View style={{ ...styles.tokenName, backgroundColor: theme.colors.background }}>
          <Text>
            {item.name ?? item.id}
          </Text>
        </View>
      </CardWithIcons>
      <Divider />
    </React.Fragment>
  );

  const renderList = () => {
    if (tokensLoading) {
      return <SectionHeading title="Loading" />;
    }

    if (tokensError) {
      return <SectionHeading title="Could not fetched tokens. Make sure that you're connected to internet." />;
    }

    if (!tokens.length) {
      return <SectionHeading title="No matching tokens." />;
    }

    return tokens.map(renderItem);
  };

  return (
    <>
      <Button
        style={style}
        icon="plus"
        mode="contained"
        onPress={() => handleSnapPress(2)}
      >
        Add collection
      </Button>
      <Portal>
        <BottomSheet
          testID="nftSelector"
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: '#0d0e35' }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
          <BottomSheetScrollView contentContainerStyle={styles.bottomSheet}>
            <TextInput
              testID="nftTokenSearch"
              label="Search a token"
              activeUnderlineColor="white"
              value={search}
              onChangeText={setSearch}
              right={<TextInput.Icon
                name="content-paste"
                accessibilityLabel="Paste"
                forceTextInputFocus={false}
                onPress={handlePaste}
              />}
              dense
            />
            {renderList()}
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#0d0e35',
  },
  tokenName: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
