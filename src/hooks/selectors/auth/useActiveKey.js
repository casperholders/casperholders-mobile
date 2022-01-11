import getSignerFromId from '@/services/signers/getSignerFromId';
import { useSelector } from 'react-redux';

export default function useActiveKey() {
  return useSelector((state) => getSignerFromId(state.auth.signerId).getPublicKey(state));
}
