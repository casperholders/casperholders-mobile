import DrawerContent from '@/components/navigation/DrawerContent';
import BalanceScreen from '@/screens/BalanceScreen';
import HomeScreen from '@/screens/HomeScreen';
import TransferScreen from '@/screens/TransferScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme as NavigationDarkTheme, NavigationContainer } from '@react-navigation/native';
import { merge } from 'lodash';
import React from 'react';
import { StatusBar } from 'react-native';
import { DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme, {
  dark: true,
  colors: {
    primary: '#00126b',
    background: '#00012a',
    surface: '#00012a',
    card: '#00126b',
  },
});

const Drawer = createDrawerNavigator();

export default function Main() {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={CombinedDarkTheme.colors.card}
        barStyle="light-content"
      />
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              drawerStyle: {
                width: 240,
              },
            }}
          >
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'CasperHolders' }}
            />
            <Drawer.Screen
              name="Balance"
              component={BalanceScreen}
            />
            <Drawer.Screen
              name="Transfer"
              component={TransferScreen}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
