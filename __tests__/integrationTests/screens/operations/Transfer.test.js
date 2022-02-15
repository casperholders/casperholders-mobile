import AppProvider from '@/AppProvider';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { fireEvent, render } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Main.js', () => {
  test('Should validate transfer form', async () => {
    getStore().dispatch(
      connect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: TEST_LOCAL_SIGNER_KEY },
      }),
    );

    getStore().dispatch(
      setNetwork({
        network: TestnetAdapter.ID,
      }),
    );

    const {
      findByTestId,
      debug,
    } = render(<Main initialRoute="OperationsTab" />, {
      wrapper: AppProvider,
    });

    const transfer = await findByTestId(/goToTransfer/i);
    expect(transfer).toBeTruthy();

    fireEvent.press(transfer);

    const transferSubmit = await findByTestId(/TransferSubmit/i, {}, { timeout: 5000 });
    const addressErrorMessage = await findByTestId(/addressErrorMessage/i);
    const amountErrorMessage = await findByTestId(/amountErrorMessage/i);

    expect(addressErrorMessage.props.children).toBeUndefined();
    expect(amountErrorMessage.props.children).toEqual('Amount to transfer (minimum of 2.5 CSPR)');

    //Try to send the transaction
    fireEvent.press(transferSubmit);


    //Should fail because address is not set & amount is 1
    expect(addressErrorMessage.props.children).toEqual('Address is required');
    expect(amountErrorMessage.props.children).toEqual('Amount must be at least 2.5');

    //Set wrong address & amount
    const addressInput = await findByTestId(/addressInput/i);
    const amountInput = await findByTestId(/amountInput/i);

    fireEvent.changeText(addressInput, 'a');

    expect(addressErrorMessage.props.children).toEqual('Address is too short');
    fireEvent.changeText(addressInput, 'aaaaaaaaaaaaaa');

    expect(addressErrorMessage.props.children).toEqual('Error: Invalid public key');

    fireEvent.changeText(amountInput, '50000000000000000000');

    expect(amountErrorMessage.props.children).toEqual('Not enough funds');

    //Set correct address & amount
    fireEvent.changeText(addressInput, '02029d865f743f9a67c82c84d443cbd8187bc4a08ca7b4c985f0caca1a4ee98b1f4c');

    expect(addressErrorMessage.props.children).toBeUndefined();
    fireEvent.changeText(amountInput, '2.5');

    expect(amountErrorMessage.props.children).toEqual('Amount to transfer (minimum of 2.5 CSPR)');

    //Test transfer ID field
    const transferIDErrorMessage = await findByTestId(/transferIDErrorMessage/i);
    const transferIDInput = await findByTestId(/transferIDInput/i);

    expect(transferIDErrorMessage).toBeTruthy();
    expect(transferIDErrorMessage.props.children).toEqual('You can leave 1 if unknown');

    fireEvent.changeText(transferIDInput, 'a');


    expect(transferIDErrorMessage.props.children).toEqual('Transfer ID must be a number');

    fireEvent.changeText(transferIDInput, '');


    expect(transferIDErrorMessage.props.children).toEqual('Transfer ID is required');

    fireEvent.changeText(transferIDInput, '1');


    expect(transferIDErrorMessage.props.children).toEqual('You can leave 1 if unknown');

    //Try to send the transaction
    fireEvent.press(transferSubmit);


    //Should display the confirmation modal
    const amountConfirmation = await findByTestId(/amountConfirmation/i);
    expect(amountConfirmation).toBeTruthy();

  });
});
