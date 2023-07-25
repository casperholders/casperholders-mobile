import { getStore } from '@/store';
import theme from '@/theme';
import Big from 'big.js';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import toFormat from 'toformat';

toFormat(Big);

export default function AppProvider({ children }) {
  return (
    <ReduxProvider store={getStore()}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ReduxProvider>
  );
}
