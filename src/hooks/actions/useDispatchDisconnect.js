import { disconnect } from '@/store/reducers/authReducer';
import { useDispatch } from 'react-redux';

/**
 * Disconnect the user
 * @returns {function(): any}
 */
export default function useDispatchDisconnect() {
  const dispatch = useDispatch();

  return () => dispatch(disconnect());
}
