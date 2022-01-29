import { ClientCasper } from '@casperholders/core/dist/services/clients/clientCasper';

export default function (rpcUrl) {
  return new ClientCasper(rpcUrl);
};
