import MainNavigator from '@/components/layout/MainNavigator';
import useConnected from '@/hooks/auth/useConnected';
import LoginScreen from '@/screens/LoginScreen';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

/**
 * Main view of the app. Display the login screen or the screen if logged in
 * @returns {JSX.Element}
 * @constructor
 */
export default function Main() {
  const theme = useTheme();
  const connected = useConnected();
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
    >
      {!connected ? <LoginScreen /> : <MainNavigator navigation={navigationRef} />}
    </NavigationContainer>
  );
};
