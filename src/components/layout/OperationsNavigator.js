import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import OperationsScreen from '@/screens/operations/OperationsScreen';
import TransferScreen from '@/screens/operations/TransferScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function OperationsNavigator(props) {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="Operations">
        <Stack.Screen
          name="Operations"
          component={OperationsScreen}
        />
        <Stack.Screen name="Transfer">
          {(subProps) => <TransferScreen {...props} {...subProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
