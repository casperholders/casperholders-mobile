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
    return 'https://rpc.testnet.casperholders.com/rpc';
  }

  get eventsUrl() {
    return 'http://78.46.68.30:9999';
  }

  get dataApiUrl() {
    return 'https://data.testnet.casperholders.com';
  }

  get apiUrl() {
    return 'https://api.testnet.casperholders.io';
  }

  get auctionManagerHash() {
    return '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2';
  }
}
