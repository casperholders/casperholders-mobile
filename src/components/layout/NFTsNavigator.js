import NavigatorWrapper from '@/components/layout/NavigatorWrapper';
import NFTsScreen from '@/screens/NFTsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/**
 * NFTs navigator
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function NFTsNavigator(props) {
  return (
    <NavigatorWrapper>
      <Stack.Navigator initialRouteName="NFTs">
        <Stack.Screen
          name="NFTs"
          component={NFTsScreen}
        />
      </Stack.Navigator>
    </NavigatorWrapper>
  );
}
