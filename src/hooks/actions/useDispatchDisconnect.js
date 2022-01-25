import { disconnect } from '@/store/reducers/authReducer';
import { useDispatch } from 'react-redux';

export default function useDispatchDisconnect() {
  const dispatch = useDispatch();

  return () => dispatch(disconnect());
}
