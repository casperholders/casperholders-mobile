import AbstractAdapter from '@/services/newSigners/abstractAdapter';
import DeployConnection from '@/services/newSigners/deployConnection';
import { LedgerSigner } from '@casperholders/core/dist/services/signers/ledgerSigner';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';

export default class LedgerAdapter extends AbstractAdapter {
  static get ID() {
    return 'LEDGER_SIGNER';
  }

  get name() {
    return 'Ledger';
  }

  get coreSigner() {
    return LedgerSigner;
  }

  computePublicKey(options) {
    return options.keysByKeyPaths[options.activeKeyPath];
  }

  async openConnection(options) {
    const publicKey = this.computePublicKey(options);
    const transport = await TransportBLE.open(options.deviceId);
    const app = new CasperApp(transport);

    return new DeployConnection({
      keyPath: options.activeKeyPath, publicKey, app,
    }, async () => {
      transport.close();
      await TransportBLE.disconnect(options.deviceId).catch(() => {
      });
    });
  }
};
