declare module '@env' {
  /**
   * The Casper network to use.
   * @type {string}
   */
  export const APP_NETWORK: string;

  /**
   * The Casper live website URL.
   * @type {string}
   */
  export const APP_CASPER_LIVE_URL: string;

  /**
   * The Casper RPC URL.
   * @type {string}
   */
  export const APP_RPC_URL: string;

  /**
   * The data API URL.
   * @type {string}
   */
  export const APP_DATA_API_URL: string;

  /**
   * The fake private key for local testing using local signer.
   * @type {string}
   */
  export const TEST_LOCAL_SIGNER_KEY: string | undefined;
}
