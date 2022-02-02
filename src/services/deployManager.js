import clientCasper from '@/services/clientCasper';
import { DeployManager } from '@casperholders/core/dist/services/deploys/deployManager';

/**
 * DeployManager from the CasperHolders core lib
 * @param rpcUrl
 * @returns {*}
 */
export default function (rpcUrl) {
  return new DeployManager(clientCasper(rpcUrl));
};
