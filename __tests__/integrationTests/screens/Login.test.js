import AppProvider from '@/AppProvider';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Login', () => {
  test('should render login when disconnected', () => {
    const { queryByText, queryAllByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });
    expect(queryAllByText(/connect with ledger/i)).toBeTruthy();
    expect(queryAllByText(/connect locally/i)).toBeTruthy();
    expect(queryByText(/balance/i)).toBeFalsy();

    expect(toJSON()).toMatchSnapshot();
  });

  test('should connect with test key', async () => {
    const { queryByText, queryAllByText, getByTestId, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    expect(queryAllByText(/connect with ledger/i)).toBeTruthy();
    expect(queryAllByText(/connect locally/i)).toBeTruthy();
    expect(queryByText(/balance/i)).toBeFalsy();
    const testKeyBtn = getByTestId(/loginTestKeyBtn/i);
    expect(testKeyBtn).toBeTruthy();

    fireEvent.press(testKeyBtn);

    expect(queryByText(/connect with test key/i)).toBeFalsy();
    expect(queryByText(/connect with ledger/i)).toBeFalsy();
    expect(queryByText(/connect locally/i)).toBeFalsy();
    expect(queryAllByText(/balance/i)).toBeTruthy();
    expect(queryAllByText(/mainnet/i)).toBeTruthy();
    expect(queryByText(/testnet/i)).toBeFalsy();

    const button = getByTestId(/goToSettings/i);
    fireEvent.press(button);

    const logoutButton = getByTestId(/logoutButton/i);
    fireEvent.press(logoutButton);
    await act(async () => {
    });
    expect(queryAllByText(/connect with ledger/i)).toBeTruthy();
    expect(queryAllByText(/connect locally/i)).toBeTruthy();
    expect(queryByText(/balance/i)).toBeFalsy();
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

  test('should render when connected to mainnet readonly', async () => {
    getStore().dispatch(
      connect({
        adapterId: ReadOnlyAdapter.ID,
        options: { publicKey: '01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c' },
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
});
