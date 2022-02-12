import AppProvider from '@/AppProvider';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

describe('Main.js', () => {
  test('should render login when disconnected', () => {
    const { queryByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });
    expect(queryByText(/connect with ledger/i)).toBeTruthy();
    expect(queryByText(/connect locally/i)).toBeTruthy();
    expect(queryByText(/balance/i)).toBeFalsy();

    expect(toJSON()).toMatchSnapshot();
  });

  test('should render when connected to mainnet', async () => {
    getStore().dispatch(
      connect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: TEST_LOCAL_SIGNER_KEY },
      }),
    );

    const { queryByText, queryAllByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      expect(queryByText(/loading.../i)).toBeFalsy();
    });

    expect(queryByText(/connect with ledger/i)).toBeFalsy();
    expect(queryByText(/connect locally/i)).toBeFalsy();
    expect(queryAllByText(/balance/i)).toBeTruthy();
    expect(queryAllByText(/mainnet/i)).toBeTruthy();
    expect(queryByText(/testnet/i)).toBeFalsy();

    expect(toJSON()).toMatchSnapshot();
  });

  test('should render when connected to testnet', async () => {
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

    const { queryByText, queryAllByText, getByTestId, getByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      expect(queryByText(/Loading.../i)).toBeFalsy();
    });

    expect(queryByText(/Connect with Ledger/i)).toBeFalsy();
    expect(queryByText(/Connect locally/i)).toBeFalsy();
    expect(queryAllByText(/Balance/i)).toBeTruthy();
    expect(queryByText(/Mainnet/i)).toBeFalsy();
    expect(queryAllByText(/Testnet/i)).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
    const button = getByTestId(/goToSettings/i);
    fireEvent.press(button);
    expect(getByText(/you are actually using the testnet/i)).toBeTruthy();
  });

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
    const stake = await findByTestId(/goToStake/i);
    const unstake = await findByTestId(/goToUnstake/i);
    expect(transfer).toBeTruthy();
    expect(stake).toBeTruthy();
    expect(unstake).toBeTruthy();

    fireEvent.press(transfer);


    const transferSubmit = await findByTestId(/transferSubmit/i);
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
