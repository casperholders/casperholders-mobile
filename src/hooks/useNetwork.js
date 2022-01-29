import { selectNetwork } from '@/store/reducers/networkReducer';
import { useSelector } from 'react-redux';

export default function useNetwork() {
  return useSelector(selectNetwork);
}
