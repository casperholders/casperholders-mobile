// TODO Manage env correctly.
export const NETWORK = process.env.APP_NETWORK || 'casper-test';
export const RPC = process.env.APP_RPC || 'https://node.testnet.casperholders.com';
export const CASPER_LIVE_URL = NETWORK === 'casper' ? 'https://cspr.live' : 'https://testnet.cspr.live';
