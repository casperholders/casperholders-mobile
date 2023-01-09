import AbstractAdapter from '@/services/signers/abstractAdapter';
import DeployConnection from '@/services/signers/deployConnection';
import generateAsymmetricKey from '@/services/signers/generateAsymmetricKey';
import { LocalSigner } from '@casperholders/core';

/**
 * Local Adapter used with a private key string for testing purpose only !!
 */
export default class LocalAdapter extends AbstractAdapter {
  constructor() {
    super();

    this.cachedKeys = {};
  }

  static get ID() {
    return 'LOCAL_SIGNER';
  }

  get name() {
    return 'Local';
  }

  get coreSigner() {
    return LocalSigner;
  }

  computePublicKey(options) {
    return this.generateAndCacheAsymmetricKey(options).publicKey.toHex();
  }

  async openConnection(options) {
    return new DeployConnection({
      key: this.generateAndCacheAsymmetricKey(options),
    });
  }

  generateAndCacheAsymmetricKey(options) {
    if (!(options.privateKey in this.cachedKeys)) {
      this.cachedKeys[options.privateKey] = generateAsymmetricKey(options.privateKey);
    }

    return this.cachedKeys[options.privateKey];
  }
};
