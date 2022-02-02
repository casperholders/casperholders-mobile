import store from '@/store';
import theme from '@/theme';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

export default function AppProvider({ children }) {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ReduxProvider>
  );
}
