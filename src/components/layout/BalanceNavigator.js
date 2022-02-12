import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import BalanceScreen from '@/screens/BalanceScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

/**
 * Balance navigator
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BalanceNavigator(props) {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="Balance">
        <Stack.Screen
          name="Balance"
          component={BalanceScreen}
          options={{
            headerRight: () => (
              <IconButton
                testID='goToSettings'
                icon="cog"
                onPress={() => props.navigation.navigate('Settings')}
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
