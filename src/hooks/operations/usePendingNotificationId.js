import { useSelector } from 'react-redux';

export default function usePendingNotificationId() {
  return useSelector((state) => state.operations.pendingNotificationId);
}
