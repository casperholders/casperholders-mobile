import clientCasper from '@/services/clientCasper';
import { DeployManager } from '@casperholders/core/dist/services/deploys/deployManager';

export default new DeployManager(clientCasper);
