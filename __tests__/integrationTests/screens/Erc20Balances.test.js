import AppProvider from '@/AppProvider';
import Main from '@/Main';
import MainnetAdapter from '@/services/networks/mainnetAdapter';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

jest.setTimeout(500000);

describe('Erc20Balances.js', () => {
  beforeEach(() => {
    resetStore();
  });

  test('Should show ERC20 balance with tokens', async () => {
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

    const view = render(<Main initialRoute="BalanceTab" />, {
      wrapper: AppProvider,
    });

    await waitFor(() => expect(view.queryByText(/\d+ tokens with funds/i)).toBeTruthy(), {
      timeout: 15000,
    });

    const erc20Toggle = view.getByTestId('erc20Toggle');

    expect(erc20Toggle).toBeTruthy();

    fireEvent.press(erc20Toggle);

    expect(view.queryByText(/\d+ tokens with funds/i)).toBeTruthy();
    expect(view.queryByText('Wrapped Casper')).toBeTruthy();
    expect(view.queryByText(/\d+\.\d{5} WCSPR/)).toBeTruthy();
  });

  test('Should show ERC20 balance without tokens', async () => {
    getStore().dispatch(
      connect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: TEST_LOCAL_SIGNER_KEY },
      }),
    );

    getStore().dispatch(
      setNetwork({
        network: MainnetAdapter.ID,
      }),
    );

    const view = render(<Main initialRoute="BalanceTab" />, {
      wrapper: AppProvider,
    });

    await waitFor(() => expect(view.queryByText(/0 tokens with funds/i)).toBeTruthy(), {
      timeout: 15000,
    });
  });
});
