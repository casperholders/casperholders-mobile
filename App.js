import '@/0bootstrap';
import AppProvider from '@/AppProvider';
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
