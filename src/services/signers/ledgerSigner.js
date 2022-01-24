import generateAsymmetricKey from '@/services/signers/generateAsymmetricKey';
import { LedgerSigner } from '@casperholders/core/dist/services/signers/ledgerSigner';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';

let app = undefined;
let device = "";

async function getCasperApp(deviceId) {
  if (device !== deviceId) {
    device = deviceId;
    const transport = await TransportBLE.open(device);
    app = new CasperApp(transport);
  }

  return app;
}

export default {
  id: 'LEDGER_SIGNER',
  signer: LedgerSigner,
  getPublicKey: (state) => getCasperApp(state.auth.device).publicKey.toHex(),
  getOptionsForTransfer: (state) => ({
    key: generateAsymmetricKeyAndCache(state.auth.activeKey),
  }),
  getOptionsForOperations: (state) => ({
    key: generateAsymmetricKeyAndCache(state.auth.activeKey),
  }),
  getOptionsForValidatorOperations: (state) => ({
    key: generateAsymmetricKeyAndCache(state.auth.activeKey),
  }),
};
