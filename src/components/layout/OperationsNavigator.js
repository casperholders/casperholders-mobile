import OperationsScreen from '@/screens/operations/OperationsScreen';
import TransferScreen from '@/screens/operations/TransferScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import DelegateScreen from '../../screens/operations/DelegateScreen';
import UndelegateScreen from '../../screens/operations/UndelegateScreen';

const Stack = createNativeStackNavigator();

export default function OperationsNavigator(props) {
  return (
    <View
      style={{ flex: 1 }}
      collapsable={false}
    >
      <Stack.Navigator initialRouteName="Operations">
        <Stack.Screen
          name="Operations"
          component={OperationsScreen}
        />
        <Stack.Screen name="Transfer">
          {() => <TransferScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Stake">
          {() => <DelegateScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Unstake">
          {() => <UndelegateScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}
