import { ClientCasper } from '@casperholders/core';

/**
 * ClientCasper from the CasperHolders core lib
 * @param rpcUrl
 * @returns {*}
 */
export default function (rpcUrl) {
  return new ClientCasper(rpcUrl);
};
