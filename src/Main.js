import MainNavigator from '@/components/layout/MainNavigator';
import React from 'react';
import useConnected from './hooks/selectors/useConnected';
import LoginScreen from './screens/LoginScreen';

export default function Main() {
  const connected = useConnected();

  return !connected ? <LoginScreen /> : <MainNavigator />;
};
