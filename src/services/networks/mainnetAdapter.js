import AbstractNetworkAdapter from '@/services/networks/abstractNetworkAdapter';

/**
 * Mainnet adapter
 */
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
    return 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea';
  }
}