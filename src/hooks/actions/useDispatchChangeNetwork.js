import { setNetwork } from '@/store/reducers/networkReducer';
import { useDispatch } from 'react-redux';

/**
 * Change the network use by the app
 * @returns {function(*): any}
 */
export default function useDispatchChangeNetwork() {
  const dispatch = useDispatch();

  return (payload) => dispatch(setNetwork(payload));
}
