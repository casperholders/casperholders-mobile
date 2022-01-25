import * as Notifications from 'expo-notifications';

export default async function ensureNotificationsPermission() {
  const { status: currentStatus } = await Notifications.getPermissionsAsync();
  if (currentStatus !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      return false;
    }
  }

  return true;
}
