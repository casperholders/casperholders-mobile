import { setNetwork } from '@/store/reducers/networkReducer';
import { useDispatch } from 'react-redux';

export default function useDispatchChangeNetwork() {
  const dispatch = useDispatch();

  return (payload) => dispatch(setNetwork(payload));
}
