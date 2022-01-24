import { selectPublicKey } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

export default function usePublicKey() {
  return useSelector(selectPublicKey);
}
