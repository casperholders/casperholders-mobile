import '@/bootstrap';
import Main from '@/Main';
import store from '@/store';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { merge } from 'lodash';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import './polyfill';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme, {
  dark: true,
  roundness: 8,
  colors: {
    primary: '#00126b',
    textLoader: '#0d0e35',
    background: '#00012a',
    surface: '#00012a',
    card: '#00012a',
    error: '#ff5252',
    success: '#4caf50',
    notification: '#ff473e',
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <StatusBar
            backgroundColor={CombinedDarkTheme.colors.card}
            barStyle="light-content"
          />
          <PaperProvider theme={CombinedDarkTheme}>
            <Main />
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
