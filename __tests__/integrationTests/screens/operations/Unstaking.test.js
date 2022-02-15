import AppProvider from '@/AppProvider';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { fireEvent, render } from '@testing-library/react-native';
import { View } from 'react-native';

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View } = require('react-native');
  const RealModule = jest.requireActual('react-native-paper');
  const MockedModule = {
    ...RealModule,
    Portal: ({ children }) => <View>{children}</View>,
  };
  return MockedModule;
});

beforeEach(() => {
  resetStore();

});

jest.setTimeout(500000);

describe('Main.js', () => {
  test('Should validate unstake form', async () => {
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

    const unstake = await findByTestId(/goToUnstake/i);
    expect(unstake).toBeTruthy();

    fireEvent.press(unstake);

    const unstakeSubmit = await findByTestId(/UnstakeSubmit/i, {}, { timeout: 5000 });
    const validatorErrorMessage = await findByTestId(/validatorErrorMessage/i);
    const amountErrorMessage = await findByTestId(/amountErrorMessage/i);

    expect(validatorErrorMessage.props.children).toBeUndefined();
    expect(amountErrorMessage.props.children).toEqual('Amount to unstake (minimum of 1 CSPR)');

    //Try to send the transaction
    fireEvent.press(unstakeSubmit);

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
