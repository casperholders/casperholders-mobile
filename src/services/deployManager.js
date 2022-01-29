import clientCasper from '@/services/clientCasper';
import { DeployManager } from '@casperholders/core/dist/services/deploys/deployManager';

export default function (rpcUrl) {
  return new DeployManager(clientCasper(rpcUrl));
};
