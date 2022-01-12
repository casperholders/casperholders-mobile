import selectConnected from '@/hooks/selectors/auth/selectConnected';
import { useSelector } from 'react-redux';

export default function useConnected() {
  return useSelector(selectConnected);
}
