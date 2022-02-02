import AppProvider from '@/AppProvider';
import '@/bootstrap';
import Main from '@/Main';
import theme from '@/theme';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

/**
 * Root view of the app with the providers needed to wrap the main view
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={theme.colors.card}
          barStyle="light-content"
        />
        <AppProvider>
          <Main />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
