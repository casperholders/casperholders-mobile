import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import DelegateScreen from '@/screens/operations/DelegateScreen';
import OperationsScreen from '@/screens/operations/OperationsScreen';
import TransferScreen from '@/screens/operations/TransferScreen';
import UndelegateScreen from '@/screens/operations/UndelegateScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          {() => <TransferScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Stake">
          {() => <DelegateScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Unstake">
          {() => <UndelegateScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
