import 'react-native-gesture-handler/jestSetup';

global.__reanimatedWorkletInit = jest.fn();
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {
  };

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
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
