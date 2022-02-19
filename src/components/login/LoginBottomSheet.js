import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import LoginButton from '@/components/login/LoginButton';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Title } from 'react-native-paper';

/**
 * Abstract login bottom sheet
 * @param icon
 * @param title
 * @param children
 * @param index
 * @returns {JSX.Element}
 */
export default function ({ icon, title, children, index = 0 }) {
  const bottomSheetRef = useRef(null);
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
    },
    contentContainer: {
      backgroundColor: '#0d0e35',
      padding: 20,
    },
    itemContainer: {
      padding: 6,
      margin: 6,
      backgroundColor: '#00126b',
    },
  });
  const snapPoints = useMemo(() => ['46%', '75%', '90%'], []);
  return (
    <>
      <LoginButton
        icon={icon}
        title={title}
        onPress={handleOpenBottomSheet}
      />
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
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
            <GridRow>
              <GridCol>
                <Title style={styles.bottomSheetTitle}>
                  {title}
                </Title>
              </GridCol>
              <GridCol>
                {children}
              </GridCol>
            </GridRow>
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    flex: 1,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  bottomSheetTitle: {
    textAlign: 'center',
  },
});
