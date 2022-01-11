import { APP_RPC_URL } from '@env';
import { ClientCasper } from '@casperholders/core/dist/services/clients/clientCasper';

export default new ClientCasper(APP_RPC_URL);
