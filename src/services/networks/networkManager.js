import MainnetAdapter from '@/services/networks/mainnetAdapter';
import TestnetAdapter from '@/services/networks/testnetAdapter';

class NetworkManager {
  /**
   * NetworkManager constructor.
   *
   * @param {Map<string, AbstractNetworkAdapter>} adapters
   */
  constructor(adapters) {
    this.adapters = adapters;
  }

  /**
   * Get the adapter corresponding to given ID.
   *
   * @param {string} id
   *
   *  @returns {AbstractNetworkAdapter}
   */
  adapter(id) {
    return this.adapters.get(id);
  }
}

const mainnetAdapter = new MainnetAdapter();
const testnetAdapter = new TestnetAdapter();

export default new NetworkManager(new Map([
  [MainnetAdapter.ID, mainnetAdapter],
  [TestnetAdapter.ID, testnetAdapter],
]));
