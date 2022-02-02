import LedgerAdapter from '@/services/signers/ledgerAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';

/**
 * SignerManager to manage the different signer types in the application
 */
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
const readOnlyAdapter = new ReadOnlyAdapter();

export default new SignerManager(new Map([
  [LedgerAdapter.ID, ledgerAdapter],
  [LocalAdapter.ID, localAdapter],
  [ReadOnlyAdapter.ID, readOnlyAdapter],
]));
