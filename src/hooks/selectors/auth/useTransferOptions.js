import getSignerFromId from '@/services/signers/getSignerFromId';
import { useSelector } from 'react-redux';

export default function useTransferOptions() {
  return useSelector(
    (state) => getSignerFromId(state.auth.signerId).getOptionsForTransfer(state),
  );
}
