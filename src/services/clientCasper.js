import { ClientCasper } from '@casperholders/core/dist/services/clients/clientCasper';

// TODO Env variables.
const RPC = process.env.VUE_APP_RPC || 'https://node.testnet.casperholders.com';

export default new ClientCasper(RPC);
