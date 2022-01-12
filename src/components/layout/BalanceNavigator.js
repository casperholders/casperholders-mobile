import BalanceScreen from '@/screens/BalanceScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function BalanceNavigator(props) {
  return (
    <View
      style={{ flex: 1 }}
      collapsable={false}
    >
      <Stack.Navigator initialRouteName="Balance">
        <Stack.Screen
          name="Balance"
        >
          {() => <BalanceScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}
