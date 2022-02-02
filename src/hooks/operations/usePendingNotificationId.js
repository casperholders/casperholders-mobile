import { useSelector } from 'react-redux';

/**
 * Retrieve pending notification from the state
 * @returns {*}
 */
export default function usePendingNotificationId() {
  return useSelector((state) => state.operations.pendingNotificationId);
}
