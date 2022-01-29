import AbstractAdapter from '@/services/signers/abstractAdapter';

export default class ReadOnlyAdapter extends AbstractAdapter {

  static get ID() {
    return 'READ_ONLY';
  }

  get name() {
    return 'ReadOnly';
  }

  get coreSigner() {
    return undefined;
  }

  computePublicKey(options) {
    return options.publicKey;
  }
};
