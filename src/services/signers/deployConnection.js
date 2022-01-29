export default class DeployConnection {
  /**
   * SignerConnection constructor.
   *
   * @param {Object} signOptions
   * @param {() => Promise<void>|undefined} closeCallback
   */
  constructor(signOptions = {}, closeCallback = undefined) {
    this.signOptions = signOptions;
    this.closeCallback = closeCallback;
  }

  /**
   * Get the sign options.
   * @type {Object}
   */
  get options() {
    return this.signOptions;
  }

  /**
   * Close this connection instance.
   *
   * @returns {Promise<void>}
   */
  async close() {
    if (this.closeCallback) {
      await this.closeCallback();
    }
  }
}
