import AccountNavigator from '@/components/layout/AccountNavigator';
import BalanceNavigator from '@/components/layout/BalanceNavigator';
import OperationsNavigator from '@/components/layout/OperationsNavigator';
import useDeployResultsCount from '@/hooks/selectors/operations/useDeployResultsCount';
import { useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

export default function MainNavigator() {
  const theme = useTheme();
  const deployResultsCount = useDeployResultsCount();
  const deployResultsBadge = deployResultsCount
    ? (deployResultsCount > 9) ? '9+' : deployResultsCount
    : undefined;

  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: 'balance', title: 'Balance', icon: 'wallet' },
    { key: 'operations', title: 'Operations', icon: 'transfer' },
    { key: 'account', title: 'Account', icon: 'account-circle', badge: deployResultsBadge },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    balance: BalanceNavigator,
    operations: OperationsNavigator,
    account: AccountNavigator,
  });

  return (
    <BottomNavigation
      navigationState={{ index: tabIndex, routes }}
      onIndexChange={setTabIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: theme.colors.primary }}
      sceneAnimationEnabled={true}
      shifting={true}
    />
  );
}
