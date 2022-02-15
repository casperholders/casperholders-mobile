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
  test('Should validate stake form', async () => {
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
      queryByText,
      queryAllByText,
      debug,
    } = render(<Main initialRoute="OperationsTab" />, {
      wrapper: AppProvider,
    });

    const stake = await findByTestId(/goToStake/i);
    expect(stake).toBeTruthy();

    fireEvent.press(stake);

    const StakeSubmit = await findByTestId(/StakeSubmit/i, {}, { timeout: 5000 });
    const validatorErrorMessage = await findByTestId(/validatorErrorMessage/i);
    const amountErrorMessage = await findByTestId(/amountErrorMessage/i);

    expect(validatorErrorMessage.props.children).toBeUndefined();
    expect(amountErrorMessage.props.children).toEqual('Amount to stake (minimum of 1 CSPR)');

    //Try to send the transaction
    fireEvent.press(StakeSubmit);


    //Should fail because address is not set & amount is 1
    expect(validatorErrorMessage.props.children).toEqual('Address is required');
    expect(amountErrorMessage.props.children).toEqual('Amount must be at least 1');

    //Set wrong address & amount
    const amountInput = await findByTestId(/amountInput/i);
    const validatorInput = await findByTestId(/validatorInput/i);
    const validatorSearch = await findByTestId(/validatorSearch/i);

    expect(validatorSearch).toBeTruthy();

    fireEvent.changeText(validatorInput, 'a');

    expect(validatorErrorMessage.props.children).toEqual('Address is too short');
    fireEvent.changeText(validatorInput, 'aaaaaaaaaaaaaa');

    expect(validatorErrorMessage.props.children).toEqual('Error: Invalid public key');
    fireEvent.changeText(amountInput, '50000000000000000000');

    expect(amountErrorMessage.props.children).toEqual('Not enough funds');

    //Set correct address & amount
    fireEvent.changeText(validatorInput, '0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5');

    expect(validatorErrorMessage.props.children).toBeUndefined();
    fireEvent.changeText(amountInput, '1');

  });
});
