import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import BalanceScreen from '@/screens/BalanceScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function SettingsIconButton({ navigation }) {
  return <IconButton
    testID="goToSettings"
    icon="cog"
    onPress={() => navigation.navigate('Settings')}
  />;
}

/**
 * Balance navigator
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export default function BalanceNavigator({ navigation }) {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="Balance">
        <Stack.Screen
          name="Balance"
          component={BalanceScreen}
          options={{
            headerRight: () => (
              <IconButton
                testID="goToSettings"
                icon="cog"
                onPress={() => navigation.navigate('Settings')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
