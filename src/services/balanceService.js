import clientCasper from '@/services/clientCasper';
import ReduxKeyManager from '@/services/reduxKeyManager';
import { Balance } from '@casperholders/core/dist/services/balance/balance';

export default new Balance(ReduxKeyManager, clientCasper);
