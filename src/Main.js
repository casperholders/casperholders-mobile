import LoginNavigator from '@/components/layout/LoginNavigator';
import MainNavigator from '@/components/layout/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import useConnected from './hooks/selectors/auth/useConnected';

export default function Main() {
  const theme = useTheme();
  const connected = useConnected();

  return (
    <NavigationContainer theme={theme}>
      {!connected ? <LoginNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};
