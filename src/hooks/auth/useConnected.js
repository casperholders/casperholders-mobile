import { selectConnected } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

export default function useConnected() {
  return useSelector(selectConnected);
}
