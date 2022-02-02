/**
 * AbstractNetworkAdapter to manage networks inside the application
 */
export default class AbstractNetworkAdapter {
  /**
   * Get the network unique ID.
   * @type {string}
   */
  static get ID() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the network human readable name.
   * @type {string}
   */
  get name() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the network.
   * @type {string}
   */
  get network() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the cspr live url.
   * @type {string}
   */
  get csprLiveUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the rpc url.
   * @type {string}
   */
  get rpcUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the data Api Url.
   * @type {string}
   */
  get dataApiUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the api url.
   * @type {string}
   */
  get apiUrl() {
    throw new Error('you must implement this method');
  }

  /**
   * Get the auction manager hash.
   * @type {string}
   */
  get auctionManagerHash() {
    throw new Error('you must implement this method');
  }
}