import selectPublicKey from '@/hooks/selectors/auth/selectPublicKey';
import store from '@/store';
import { NoActiveKeyError } from '@casperholders/core/dist/services/errors/noActiveKeyError';
import { AbstractKeyManager } from '@casperholders/core/dist/services/keys/abstractKeyManager';

export default class ReduxKeyManager extends AbstractKeyManager {
  static get activeKey() {
    const state = store.getState();
    if (state.auth.connected && state.auth.activeKey) {
      return selectPublicKey(state);
    }

    throw new NoActiveKeyError();
  }
}
