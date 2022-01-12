import getSignerFromId from '@/services/signers/getSignerFromId';

export default (state) => getSignerFromId(state.auth.signerId).getPublicKey(state);
