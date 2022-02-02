import { selectPublicKey } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

/**
 * Return current public key
 * @returns {unknown}
 */
export default function usePublicKey() {
  return useSelector(selectPublicKey);
}
