import AppProvider from '@/AppProvider';
import Main from '@/Main';
import MainnetAdapter from '@/services/networks/mainnetAdapter';
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
  test('Should show balance without tokens', async () => {
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
});
