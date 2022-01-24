import { selectOptions } from '@/store/reducers/authReducer';
import { useSelector } from 'react-redux';

export default function useOptions() {
  return useSelector(selectOptions);
}
