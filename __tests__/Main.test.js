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

    expect(queryByText('Connect with Ledger')).toBeTruthy();
    expect(queryByText('Connect locally')).toBeTruthy();
    expect(queryByText('Balance')).toBeFalsy();

    expect(toJSON()).toMatchSnapshot();
  });

  test('should render navigator when connected to mainnet', async () => {
    getStore().dispatch(connect({
      adapterId: LocalAdapter.ID,
      options: { privateKey: TEST_LOCAL_SIGNER_KEY },
    }));

    const { queryByText, queryAllByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      expect(queryByText('Loading...')).toBeFalsy();
    });

    expect(queryByText('Connect with Ledger')).toBeFalsy();
    expect(queryByText('Connect locally')).toBeFalsy();
    expect(queryAllByText('Balance')).toBeTruthy();
    expect(queryAllByText('Mainnet')).toBeTruthy();
    expect(queryByText('Testnet')).toBeFalsy();

    expect(toJSON()).toMatchSnapshot();
  });

  test('should render navigator when connected to testnet', async () => {
    getStore().dispatch(connect({
      adapterId: LocalAdapter.ID,
      options: { privateKey: TEST_LOCAL_SIGNER_KEY },
    }));

    getStore().dispatch(setNetwork({
      network: TestnetAdapter.ID,
    }));

    const { queryByText, queryAllByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      expect(queryByText('Loading...')).toBeFalsy();
    });

    expect(queryByText('Connect with Ledger')).toBeFalsy();
    expect(queryByText('Connect locally')).toBeFalsy();
    expect(queryAllByText('Balance')).toBeTruthy();
    expect(queryByText('Mainnet')).toBeFalsy();
    expect(queryAllByText('Testnet')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });


  test('should render navigator operations', async () => {
    getStore().dispatch(connect({
      adapterId: LocalAdapter.ID,
      options: { privateKey: TEST_LOCAL_SIGNER_KEY },
    }));

    getStore().dispatch(setNetwork({
      network: TestnetAdapter.ID,
    }));

    const {
      debug,
      findByText,
      findAllByText,
      getAllByText,
      queryByText,
      queryAllByText,
      queryAllByTestId,
      getByText,
      toJSON,
    } = render(
      <Main />, {
        wrapper: AppProvider,
      });

    const toClick = getAllByText('Operations');
    console.log(toClick);
    fireEvent(toClick[0], 'press');
    fireEvent(toClick[1], 'press');

    const transfer = await findByText('Choose an operation to execute from the list bellow');
    console.log(transfer);
    expect(transfer).toBeTruthy();
  });
});
