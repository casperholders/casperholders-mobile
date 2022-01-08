import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import BalanceScreen from '@/screens/BalanceScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function BalanceNavigator() {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="Balance">
        <Stack.Screen
          name="Balance"
          component={BalanceScreen}
        />
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
