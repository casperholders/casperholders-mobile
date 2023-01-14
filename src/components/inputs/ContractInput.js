import SectionHeading from '@/components/common/SectionHeading';
import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import ValidatorCard from '@/components/ValidatorCard';
import useInput from '@/hooks/inputs/useInput';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CLPublicKey } from 'casper-js-sdk';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Portal, TextInput } from 'react-native-paper';

/**
 * Contract input
 * @param form
 * @param label
 * @param hint
 * @param value
 * @param onChangeValue
 * @param undelegate
 * @returns {JSX.Element}
 * @constructor
 */
export default function ContractInput({ form, label, hint, value, onChangeValue }) {
  const [internalValue, setInternalValue, error] = useInput(form, value, [
    (a) => !!a || 'Address is required',
    (a) => a.length >= 2 || 'Address is too short',
    (a) => {
      try {
        CLPublicKey.fromHex(a);
        return true;
      } catch (e) {
        return e.toString();
      }
    },
  ], onChangeValue);

  const [search, setSearch] = useState('');

  const [contractLoading, contracts, contractError] = useContractsList();

  // hooks
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback((value) => {
    setInternalValue(value);
    sheetRef.current?.close();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
    },
    contentContainer: {
      backgroundColor: '#0d0e35',
    },
    itemContainer: {
      padding: 6,
      margin: 6,
      backgroundColor: '#00126b',
    },
  });
  // render
  const renderItem = useCallback(
    (item, index) => (
      item.header ?
        <SectionHeading
          key={index}
          title={item.header}
        /> :
        <ValidatorCard
          key={index}
          validator={item}
          onPress={() => handleClosePress(item.publicKey)}
        />
    ),
    [],
  );
  return (
    <InputWrapper>
      <Pressable
        testID="validatorPress"
        onPress={() => handleSnapPress(2)}
      >
        <View pointerEvents="none">
          <TextInput
            label={label}
            testID="validatorInput"
            activeUnderlineColor="white"
            error={!!error}
            editable={process.env.NODE_ENV === 'test'}
            value={internalValue.current}
            dense
            onChangeText={setInternalValue}
            left={<TextInput.Icon name="account" />}
          />
        </View>
      </Pressable>
      <InputMessages
        testID="validatorErrorMessage"
        error={error}
        hint={hint}
      />
      <Portal>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{
            backgroundColor: '#0d0e35',
          }}
          handleIndicatorStyle={{
            backgroundColor: 'white',
          }}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
              testID="validatorSearch"
              label="Search a validator"
              activeUnderlineColor="white"
              value={search}
              onChangeText={setSearch}
              dense
            />
            {
              contractLoading ?
                <SectionHeading title="Loading" /> :
                filteredValidators.map(renderItem)
            }
            {contractError &&
              <SectionHeading title="Oops. We couldn't load the contract list. Make sure that you're connected to internet." />}
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </InputWrapper>
  );
}
