import AbstractNetworkAdapter from '@/services/networks/abstractNetworkAdapter';

/**
 * Testnet adapter
 */
export default class TestnetAdapter extends AbstractNetworkAdapter {
  static get ID() {
    return 'CASPER_TESTNET';
  }

  get name() {
    return 'Testnet';
  }

  get network() {
    return 'casper-test';
  }

  get csprLiveUrl() {
    return 'https://testnet.cspr.live';
  }

  get rpcUrl() {
    return 'https://node.testnet.casperholders.com';
  }

  get dataApiUrl() {
    return 'https://data.testnet.casperholders.com';
  }

  get apiUrl() {
    return 'https://api.testnet.casperholders.io';
  }

  get auctionManagerHash() {
    return 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea';
  }
}