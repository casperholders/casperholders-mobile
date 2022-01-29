declare module '@env' {
    /**
     * Disable the event sources watching to avoid bugs due to Flipper debug proxies.
     * @type {string}
     */
    export const APP_DISABLE_EVENT_SOURCES: string;

    /**
     * The fake private key for local testing using local signer.
     * @type {string}
     */
    export const TEST_LOCAL_SIGNER_KEY: string | undefined;
}
