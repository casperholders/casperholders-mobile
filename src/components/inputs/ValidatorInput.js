import SectionHeading from '@/components/common/SectionHeading';
import InputMessages from '@/components/inputs/InputMessages';
import InputWrapper from '@/components/inputs/InputWrapper';
import ValidatorCard from '@/components/ValidatorCard';
import useInput from '@/hooks/inputs/useInput';
import useValidatorList from '@/hooks/useValidatorList';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CLPublicKey } from 'casper-js-sdk';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Portal, TextInput } from 'react-native-paper';

/**
 * Validator input
 * @param form
 * @param label
 * @param hint
 * @param value
 * @param onChangeValue
 * @param undelegate
 * @returns {JSX.Element}
 * @constructor
 */
export default function ValidatorInput({ form, label, hint, value, onChangeValue, undelegate }) {
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

  const [validatorLoading, validators, validatorError] = useValidatorList(undelegate);

  function validatorFilter(validator) {
    if (validator.header) {
      return true;
    }
    if (validator.name?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }
    return !!(validator.publicKey?.toLowerCase()?.includes(search.toLowerCase()));
  }

  const filteredValidators = useMemo(() => {
    if (!validators) {
      return [];
    }
    return validators.filter(validatorFilter);
  }, [validators, search]);

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
      <Pressable onPress={() => handleSnapPress(2)}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            activeUnderlineColor="white"
            error={!!error}
            editable={false}
            value={internalValue.current}
            dense
            onChangeText={setInternalValue}
            left={<TextInput.Icon name="account" />}
          />
        </View>
      </Pressable>
      <InputMessages
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
              label="Search a validator"
              activeUnderlineColor="white"
              value={search}
              onChangeText={setSearch}
              dense
            />
            {
              validatorLoading ?
                <SectionHeading title="Loading" /> :
                filteredValidators.map(renderItem)
            }
            {validatorError &&
              <SectionHeading title="Oops. We couldn't load the validator list. Make sure that you're connected to internet." />}
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </InputWrapper>
  );
}
