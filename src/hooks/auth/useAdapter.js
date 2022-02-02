import { selectAdapter } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

/**
 * Return the current signer adapter
 * @returns {unknown}
 */
export default function useAdapter() {
  return useSelector(selectAdapter);
}
