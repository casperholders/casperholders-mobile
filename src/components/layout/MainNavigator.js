import Icon from '@/components/common/Icon';
import BalanceNavigator from '@/components/layout/BalanceNavigator';
import HistoryNavigator from '@/components/layout/HistoryNavigator';
import NFTsNavigator from '@/components/layout/NFTsNavigator';
import OperationsNavigator from '@/components/layout/OperationsNavigator';
import useDispatchClearDeployResults from '@/hooks/actions/useDispatchClearDeployResults';
import useDeployResultsCount from '@/hooks/operations/useDeployResultsCount';
import useDeploysResultNotification from '@/hooks/useDeploysResultNotification';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useEffect } from 'react';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

/**
 * Main bottom tab navigator
 * @param navigation
 * @param initialRoute
 * @returns {JSX.Element}
 * @constructor
 */
export default function MainNavigator({ navigation, initialRoute = 'BalanceTab' }) {
  useDeploysResultNotification({ navigation });

  const dispatchClearDeployResults = useDispatchClearDeployResults();
  useEffect(() => () => {
    dispatchClearDeployResults();
  }, []);

  const theme = useTheme();
  const deployResultsCount = useDeployResultsCount();
  const deployResultsBadge = deployResultsCount
    ? (deployResultsCount > 9 ? '9+' : deployResultsCount)
    : undefined;
  return (
    <Tab.Navigator
      initialRouteName={initialRoute.initialRoute}
      barStyle={{ backgroundColor: theme.colors.primary }}
    >
      <Tab.Screen
        name="BalanceTab"
        component={BalanceNavigator}
        options={{
          tabBarTestID: 'goToBalance',
          tabBarLabel: 'Balance',
          tabBarIcon: ({ color }) => (
            <Icon
              name="wallet"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OperationsTab"
        component={OperationsNavigator}
        options={{
          tabBarTestID: 'goToOperations',
          tabBarLabel: 'Operations',
          tabBarIcon: ({ color }) => (
            <Icon
              name="transfer"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NFTsTab"
        component={NFTsNavigator}
        options={{
          tabBarTestID: 'goToNfts',
          tabBarLabel: 'NFTs',
          tabBarIcon: ({ color }) => (
            <Icon
              name="image"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryNavigator}
        options={{
          tabBarTestID: 'goToHistory',
          tabBarLabel: 'History',
          tabBarBadge: deployResultsBadge,
          tabBarIcon: ({ color }) => (
            <Icon
              name="history"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
