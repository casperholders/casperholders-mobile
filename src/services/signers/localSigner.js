import { LocalSigner } from '@casperholders/core/dist/services/signers/localSigner';
import { Keys } from 'casper-js-sdk';

export default {
  id: 'LOCAL_SIGNER',
  signer: LocalSigner,
  prepareKey: (key) => {
    const privateKey = Keys.Ed25519.parsePrivateKey(
      Keys.Ed25519.readBase64WithPEM(key),
    );
    const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
    return Keys.Ed25519.parseKeyPair(publicKey, privateKey);
  },
};
