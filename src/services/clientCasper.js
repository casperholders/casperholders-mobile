import { ClientCasper } from '@casperholders/core/dist/services/clients/clientCasper';

/**
 * ClientCasper from the CasperHolders core lib
 * @param rpcUrl
 * @returns {*}
 */
export default function (rpcUrl) {
  return new ClientCasper(rpcUrl);
};
