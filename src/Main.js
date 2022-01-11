import LoginNavigator from '@/components/layout/LoginNavigator';
import MainNavigator from '@/components/layout/MainNavigator';
import React from 'react';
import useConnected from './hooks/selectors/auth/useConnected';

export default function Main() {
  const connected = useConnected();

  return !connected ? <LoginNavigator /> : <MainNavigator />;
};
