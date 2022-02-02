import { selectNetwork } from '@/store/reducers/networkReducer';
import { useSelector } from 'react-redux';

/**
 * Retrieve the network adapter from the state
 * @returns {unknown}
 */
export default function useNetwork() {
  return useSelector(selectNetwork);
}
