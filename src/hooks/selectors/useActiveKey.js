import { useSelector } from 'react-redux';

export default function useActiveKey() {
  return useSelector((state) => state.auth.activeKey);
}
