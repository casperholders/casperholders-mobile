import AbstractAdapter from '@/services/signers/abstractAdapter';
import DeployConnection from '@/services/signers/deployConnection';
import { LedgerSigner } from '@casperholders/core/dist/services/signers/ledgerSigner';
import TransportHID from '@ledgerhq/react-native-hid';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';

/**
 * Ledger Adapter
 */
export default class LedgerAdapter extends AbstractAdapter {
  static get ID() {
    return 'LEDGER_SIGNER';
  }

  static get USB() {
    return 'LEDGER_USB';
  }

  static get BLE() {
    return 'LEDGER_BLE';
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

  async openTransport(device, mode) {
    if (mode === LedgerAdapter.USB) {
      return TransportHID.open(device);
    }
    return TransportBLE.open(device);
  }

  async openConnection(options) {
    const publicKey = this.computePublicKey(options);
    const transport = await this.openTransport(options.device, options.mode);
    const app = new CasperApp(transport);

    return new DeployConnection({
      keyPath: options.activeKeyPath, publicKey, app,
    }, async () => {
      await transport.close();
    });
  }
};
