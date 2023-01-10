import AppProvider from '@/AppProvider';
import Main from '@/Main';
import MainnetAdapter from '@/services/networks/mainnetAdapter';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { render, waitFor } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Erc20Balances.js', () => {
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

    const { queryByText } = render(<Main initialRoute="BalanceTab" />, {
      wrapper: AppProvider,
    });

    expect(queryByText(/ERC20 tokens/i)).toBeTruthy();

    await waitFor(() => {
      expect(queryByText('0 tokens with funds')).toBeTruthy();
    }, { timeout: 10000 });
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

    const { getByTestId, queryByText } = render(<Main initialRoute="BalanceTab" />, {
      wrapper: AppProvider,
    });

    expect(queryByText('ERC20 tokens')).toBeTruthy();

    await waitFor(() => {
      expect(queryByText('7 tokens with funds')).toBeTruthy();
    }, { timeout: 10000 });

    const erc20ListToggle = getByTestId('erc20Toggle');

    erc20ListToggle.press();

    expect(queryByText('Wrapped Casper')).toBeTruthy();
    expect(queryByText(/\d+\.\d{5} WCSPR/)).toBeTruthy();
  });
});
