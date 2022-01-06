import DrawerContent from '@/components/layout/DrawerContent';
import BalanceScreen from '@/screens/BalanceScreen';
import TransferScreen from '@/screens/TransferScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import useConnected from './hooks/selectors/useConnected';

const Drawer = createDrawerNavigator();

export default function Main() {
  const theme = useTheme();
  const connected = useConnected();

  return !connected ?  <LoginScreen /> : (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        initialRouteName="Balance"
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
          name="Balance"
          component={BalanceScreen}
        />
        <Drawer.Screen
          name="Transfer"
          component={TransferScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
