import store from '@/store';
import { selectConnected, selectPublicKey } from '@/store/reducers/authReducer';
import { NoActiveKeyError } from '@casperholders/core/dist/services/errors/noActiveKeyError';
import { AbstractKeyManager } from '@casperholders/core/dist/services/keys/abstractKeyManager';

export default class ReduxKeyManager extends AbstractKeyManager {
  static get activeKey() {
    const state = store.getState();
    if (selectConnected(state)) {
      return selectPublicKey(state);
    }

    throw new NoActiveKeyError();
  }
}
