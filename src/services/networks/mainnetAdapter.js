import AbstractNetworkAdapter from '@/services/networks/abstractNetworkAdapter';

export default class MainnetAdapter extends AbstractNetworkAdapter {
  static get ID() {
    return 'CASPER_MAINNET';
  }

  get name() {
    return 'Mainnet';
  }

  get network() {
    return 'casper';
  }

  get csprLiveUrl() {
    return 'https://cspr.live';
  }

  get rpcUrl() {
    return 'https://node.casperholders.com';
  }

  get dataApiUrl() {
    return 'https://data.casperholders.com';
  }

  get apiUrl() {
    return 'https://api.casperholders.io';
  }

  get auctionManagerHash() {
    return '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2';
  }
}