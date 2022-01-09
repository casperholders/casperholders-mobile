import { useSelector } from 'react-redux';

export default function useConnected() {
  return useSelector((state) => state.auth.connected);
}
