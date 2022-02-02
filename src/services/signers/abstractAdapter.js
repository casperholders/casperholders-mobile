/**
 * Abstract Signer adapter to manager multiple signer types
 */
export default class AbstractAdapter {
  /**
   * Get the signer unique ID.
   * @type {string}
   */
  static get ID() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the signer human readable name.
   * @type {string}
   */
  get name() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the CasperHolders Core implementation (class extending AbstractSigner).
   * @type {string}
   */
  get coreSigner() {
    throw new Error('you must implement this method');
  }

  /**
   * Compute the public key.
   *
   * @param {Object} options Authentication options.
   */
  computePublicKey(options) {
    throw new Error('you must implement this method');
  }

  /**
   * Open the connection before signing a deploy.
   *
   * @param {Object} options Authentication options.
   *
   * @returns {Promise<{options: Object, close: () => Promise<void>}>} Options to pass to the deploy manager.
   */
  async openConnection(options) {
    throw new Error('you must implement this method');
  }
};
