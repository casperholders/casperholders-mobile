import { selectAdapter } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

export default function useAdapter() {
  return useSelector(selectAdapter);
}
