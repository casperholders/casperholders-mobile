import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import HistoryScreen from '@/screens/HistoryScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HistoryNavigator() {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="History">
        <Stack.Screen
          name="History"
          component={HistoryScreen}
        />
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
