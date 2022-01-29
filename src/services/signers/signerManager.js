import LedgerAdapter from '@/services/signers/ledgerAdapter';
import LocalAdapter from '@/services/signers/localAdapter';

class SignerManager {
  /**
   * SignerManager constructor.
   *
   * @param {Map<string, AbstractAdapter>} adapters
   */
  constructor(adapters) {
    this.adapters = adapters;
  }

  /**
   * Get the adapter corresponding to given ID.
   *
   * @param {string} id
   *
   *  @returns {AbstractAdapter}
   */
  adapter(id) {
    return this.adapters.get(id);
  }
}

const ledgerAdapter = new LedgerAdapter();
const localAdapter = new LocalAdapter();

export default new SignerManager(new Map([
  [LedgerAdapter.ID, ledgerAdapter],
  [LocalAdapter.ID, localAdapter],
]));
