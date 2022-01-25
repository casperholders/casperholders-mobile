import ensureNotificationsPermission from '@/helpers/ensureNotificationsPermission';
import usePendingDeployResultsCount
  from '@/hooks/operations/usePendingDeployResultsCount';
import usePendingNotificationId from '@/hooks/operations/usePendingNotificationId';
import { setPendingNotificationId } from '@/store/reducers/operationsReducer';
import { TabActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function useDeploysResultNotification({ navigation }) {
  const dispatch = useDispatch();
  const pendingDeployResultsCount = usePendingDeployResultsCount();
  const pendingNotificationId = usePendingNotificationId();
  const [notificationSubscription, setNotificationSubscription] = useState();

  useEffect(() => {
    const dismissNotificationIfExists = async () => {
      if (pendingNotificationId) {
        await Notifications.dismissNotificationAsync(pendingNotificationId);
        setPendingNotificationId({ notificationId: undefined });
      }
    };

    (async () => {
      if (!await ensureNotificationsPermission()) {
        return;
      }

      if (pendingDeployResultsCount > 0) {
        dispatch(setPendingNotificationId({
          notificationId: await Notifications.scheduleNotificationAsync({
            identifier: pendingNotificationId,
            content: {
              title: `${pendingDeployResultsCount} pending deploy`,
              body: `There are ${pendingDeployResultsCount} pending deploys.`,
              autoDismiss: false,
              sticky: true,
            },
            trigger: null,
          }),
        }));
      } else {
        await dismissNotificationIfExists();
      }
    })();

    return () => {
      dismissNotificationIfExists();
    };
  }, [pendingDeployResultsCount]);

  useEffect(() => {
    const unsubscribeNotification = () => {
      if (notificationSubscription) {
        notificationSubscription.remove();
        setNotificationSubscription(undefined);
      }
    };

    unsubscribeNotification();

    if (pendingNotificationId) {
      setNotificationSubscription(Notifications.addNotificationResponseReceivedListener((response) => {
        if (pendingNotificationId === response.notification.request.identifier) {
          const jumpToAction = TabActions.jumpTo('HistoryTab');

          navigation.dispatch(jumpToAction);
        }
      }));
    }

    return () => {
      unsubscribeNotification();
    };
  }, [pendingNotificationId]);
}
