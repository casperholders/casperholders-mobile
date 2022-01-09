import getSignerFromId from '@/services/signers/getSignerFromId';
import { useSelector } from 'react-redux';

export default function useSigner() {
  return useSelector((state) => getSignerFromId(state.auth.signerId).signer);
}
