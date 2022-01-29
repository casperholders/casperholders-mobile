export default class AbstractNetworkAdapter {
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
   * Get the signer human readable name.
   * @type {string}
   */
  get network() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the signer human readable name.
   * @type {string}
   */
  get csprLiveUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the signer human readable name.
   * @type {string}
   */
  get rpcUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the signer human readable name.
   * @type {string}
   */
  get dataApiUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the signer human readable name.
   * @type {string}
   */
  get apiUrl() {
    throw new Error('you must implement this method');
  }
  
  /**
   * Get the signer human readable name.
   * @type {string}
   */
  get auctionManagerHash() {
    throw new Error('you must implement this method');
  }
}