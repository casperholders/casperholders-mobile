import generateAsymmetricKey from '@/services/signers/generateAsymmetricKey';
import { LocalSigner } from '@casperholders/core/dist/services/signers/localSigner';

export default {
  id: 'LOCAL_SIGNER',
  signer: LocalSigner,
  getPublicKey: (state) => generateAsymmetricKey(state.auth.activeKey).publicKey.toHex(),
  getOptionsForTransfer: (state) => ({
    key: generateAsymmetricKey(state.auth.activeKey),
  }),
};
