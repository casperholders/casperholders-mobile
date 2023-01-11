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

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Erc20Balances.js', () => {
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

    const { findByTestId, queryAllByText } = render(<Main initialRoute="BalanceTab" />, {
      wrapper: AppProvider,
    });

    const erc20Toggle = await findByTestId('erc20Toggle');

    expect(queryAllByText(/ERC20 tokens/i)).toBeTruthy();
    await waitFor(() => {
      fireEvent.press(erc20Toggle);
      expect(queryAllByText(/7 tokens with funds/i)).toBeTruthy();
      expect(queryAllByText('Wrapped Casper')).toBeTruthy();
      expect(queryAllByText(/\d+\.\d{5} WCSPR/)).toBeTruthy();
    }, { timeout: 15000 });
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

    const { queryAllByText } = render(<Main initialRoute="BalanceTab" />, {
      wrapper: AppProvider,
    });

    expect(queryAllByText(/ERC20 tokens/i)).toBeTruthy();
    await waitFor(() => {
      return expect(queryAllByText(/0 tokens with funds/i)).toBeTruthy();
    }, { timeout: 15000 });
  });
});
