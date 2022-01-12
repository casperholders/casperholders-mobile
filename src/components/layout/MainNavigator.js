import Icon from '@/components/common/Icon';
import AccountNavigator from '@/components/layout/AccountNavigator';
import BalanceNavigator from '@/components/layout/BalanceNavigator';
import OperationsNavigator from '@/components/layout/OperationsNavigator';
import useDeployResultsCount from '@/hooks/selectors/operations/useDeployResultsCount';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {
  const theme = useTheme();
  const deployResultsCount = useDeployResultsCount();
  const deployResultsBadge = deployResultsCount
    ? (deployResultsCount > 9 ? '9+' : deployResultsCount)
    : undefined;

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: theme.colors.primary }}
    >
      <Tab.Screen
        name="BalanceTab"
        component={BalanceNavigator}
        options={{
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
        name="AccountTab"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarBadge: deployResultsBadge,
          tabBarIcon: ({ color }) => (
            <Icon
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
