import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';

export default function BottomSheetModalContainer({
                                                    bottomSheetModalRef,
                                                    snapPoints,
                                                    children,
                                                  }) {
  return (
    <Portal>
      <BottomSheetModalProvider style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          bottomInset={20}
          snapPoints={snapPoints}
          detached={true}
          style={styles.sheetContainer}
          backgroundStyle={{
            backgroundColor: '#0d0e35',
          }}
          handleIndicatorStyle={{
            backgroundColor: 'white',
          }}
        >
          <View style={styles.contentContainer}>
            {children}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sheetContainer: {
    marginHorizontal: 24,
  },
});