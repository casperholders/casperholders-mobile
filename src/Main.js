import DrawerContent from '@/components/navigation/DrawerContent';
import BalanceScreen from '@/screens/BalanceScreen';
import HomeScreen from '@/screens/HomeScreen';
import TransferScreen from '@/screens/TransferScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const Drawer = createDrawerNavigator();

export default function Main() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme}>
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
          options={{ title: 'Casper Holders' }}
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
  );
}
