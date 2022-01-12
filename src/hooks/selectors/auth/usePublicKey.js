import selectPublicKey from '@/hooks/selectors/auth/selectPublicKey';
import { useSelector } from 'react-redux';

export default function usePublicKey() {
  return useSelector(selectPublicKey);
}
