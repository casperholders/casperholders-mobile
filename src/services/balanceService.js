import clientCasper from '@/services/clientCasper';
import ReduxKeyManager from '@/services/reduxKeyManager';
import { Balance } from '@casperholders/core';

/**
 * BalanceService from the CasperHolders core lib
 * @param rpcUrl
 * @returns {*}
 */
export default function (rpcUrl) {
  return new Balance(ReduxKeyManager, clientCasper(rpcUrl));
};
