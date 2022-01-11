import { LocalSigner } from '@casperholders/core/dist/services/signers/localSigner';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { Keys } from 'casper-js-sdk';

function generateAsymmetricKey(key) {
  const privateKey = Keys.Ed25519.parsePrivateKey(
    Keys.Ed25519.readBase64WithPEM(key),
  );
  const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
  return Keys.Ed25519.parseKeyPair(publicKey, privateKey);
}

export const TEST_ASYMMETRIC_KEY = TEST_LOCAL_SIGNER_KEY
  ? generateAsymmetricKey(TEST_LOCAL_SIGNER_KEY)
  : undefined;

export default {
  id: 'TEST_LOCAL_SIGNER',
  signer: LocalSigner,
  getOptionsForTransfer: () => ({
    key: TEST_ASYMMETRIC_KEY,
  }),
};
