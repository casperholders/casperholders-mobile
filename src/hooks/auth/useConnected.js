import { selectConnected } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

/**
 * Return connected state
 * @returns {unknown}
 */
export default function useConnected() {
  return useSelector(selectConnected);
}
