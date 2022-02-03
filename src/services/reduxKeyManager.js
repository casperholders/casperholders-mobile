import { getStore } from '@/store';
import { selectConnected, selectPublicKey } from '@/store/reducers/authReducer';
import { NoActiveKeyError } from '@casperholders/core/dist/services/errors/noActiveKeyError';
import { AbstractKeyManager } from '@casperholders/core/dist/services/keys/abstractKeyManager';

/**
 * ReduxKeyManager get the active public key
 */
export default class ReduxKeyManager extends AbstractKeyManager {
  static get activeKey() {
    const state = getStore().getState();
    if (selectConnected(state)) {
      return selectPublicKey(state);
    }

    throw new NoActiveKeyError();
  }
}
