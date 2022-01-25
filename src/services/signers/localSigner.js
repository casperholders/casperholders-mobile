import generateAsymmetricKey from '@/services/newSigners/generateAsymmetricKey';
import { LocalSigner } from '@casperholders/core/dist/services/signers/localSigner';

const cachedKeys = {};

function generateAsymmetricKeyAndCache(key) {
  if (!(key in cachedKeys)) {
    cachedKeys[key] = generateAsymmetricKey(key);
  }

  return cachedKeys[key];
}

export default {
  id: 'LOCAL_SIGNER',
  signer: LocalSigner,
  getPublicKey: (state) => generateAsymmetricKeyAndCache(state.auth.activeKey).publicKey.toHex(),
  getOptionsForTransfer: (state) => ({
    key: generateAsymmetricKeyAndCache(state.auth.activeKey),
  }),
  getOptionsForOperations: (state) => ({
    key: generateAsymmetricKeyAndCache(state.auth.activeKey),
  }),
  getOptionsForValidatorOperations: (state) => ({
    key: generateAsymmetricKeyAndCache(state.auth.activeKey),
  }),
};
