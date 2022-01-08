import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import AccountScreen from '@/screens/AccountScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen
          name="Account"
          component={AccountScreen}
        />
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
