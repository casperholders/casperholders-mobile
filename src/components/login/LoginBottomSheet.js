import BottomSheetModalContainer from '@/components/common/BottomSheetModalContainer';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import LoginButton from '@/components/login/LoginButton';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

export default function ({ icon, title, children }) {
  const bottomSheetRef = useRef(null);
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <LoginButton
        icon={icon}
        title={title}
        onPress={handleOpenBottomSheet}
      />
      <BottomSheetModalContainer
        bottomSheetModalRef={bottomSheetRef}
        snapPoints={['46%']}
      >
        <View style={styles.bottomSheetWrapper}>
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
        </View>
      </BottomSheetModalContainer>
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
