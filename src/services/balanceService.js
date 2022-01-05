import clientCasper from '@/services/clientCasper';
import ReduxKeyManager from '@/services/reduxKeyManager';
import { Balance } from '@casperholders/core';

export default new Balance(ReduxKeyManager, clientCasper);
