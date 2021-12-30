import { connect } from '@/store/reducers/authReducer';
import { useDispatch } from 'react-redux';

export default function useDispatchConnect() {
  const dispatch = useDispatch();

  return (payload) => dispatch(connect(payload));
}
