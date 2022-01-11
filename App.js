import '@/bootstrap';
import Main from '@/Main';
import store from '@/store';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { merge } from 'lodash';
import React from 'react';
import { StatusBar } from 'react-native';
import { DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

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
  );
}
