import getSignerFromId from '@/services/signers/getSignerFromId';
import { useSelector } from 'react-redux';

export default function useOperationsOptions() {
  return useSelector(
    (state) => getSignerFromId(state.auth.signerId).getOptionsForOperations(state),
  );
}
