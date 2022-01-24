import MainNavigator from '@/components/layout/MainNavigator';
import LoginScreen from '@/screens/LoginScreen';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import useConnected from './hooks/auth/useConnected';

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
