import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import LocalLoginScreen from '@/screens/login/LocalLoginScreen';
import LoginScreen from '@/screens/login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login locally"
          component={LocalLoginScreen}
        />
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
