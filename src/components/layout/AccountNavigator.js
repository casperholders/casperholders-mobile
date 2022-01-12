import AccountScreen from '@/screens/AccountScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <View
      style={{ flex: 1 }}
      collapsable={false}
    >
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen
          name="Account"
          component={AccountScreen}
        />
      </Stack.Navigator>
    </View>
  );
}
