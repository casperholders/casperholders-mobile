require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const RN = require('react-native');
  const BottomSheetModalContext = React.createContext(null);
  const BottomSheetModalProvider = (props) => {
    return <BottomSheetModalContext.Provider {...props} value={{}} />;
  };

  return {
    __esModule: true,
    default: RN.View,
    BottomSheetScrollView: RN.ScrollView,
    BottomSheetModalProvider,
    namedExport: {
      ...require('react-native-reanimated/mock'),
      ...jest.requireActual('@gorhom/bottom-sheet'),
    },
  };
});

jest.mock('@ledgerhq/react-native-hw-transport-ble', () => {
  return {};
});

jest.mock('react-native-ble-plx', () => {
  return {};
});

jest.mock('@/components/login/ledger/LedgerConnect', () => {
  const RN = require('react-native');

  return {
    __esModule: true,
    default: RN.View,
  };
});
