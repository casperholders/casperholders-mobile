import AppProvider from '@/AppProvider';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import store from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { render } from '@testing-library/react-native';

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

  test('should render navigator when connected to mainnet', () => {
    store.dispatch(connect({
      adapterId: LocalAdapter.ID,
      options: { privateKey: TEST_LOCAL_SIGNER_KEY },
    }));

    const { queryByText, queryAllByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    expect(queryByText('Connect with Ledger')).toBeFalsy();
    expect(queryByText('Connect locally')).toBeFalsy();
    expect(queryAllByText('Balance')).toBeTruthy();
    expect(queryAllByText('Mainnet')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  test('should render navigator when connected to testnet', () => {
    store.dispatch(setNetwork({
      network: TestnetAdapter.ID,
    }));

    const { queryByText, queryAllByText, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });

    expect(queryByText('Connect with Ledger')).toBeFalsy();
    expect(queryByText('Connect locally')).toBeFalsy();
    expect(queryAllByText('Balance')).toBeTruthy();
    expect(queryAllByText('Testnet')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});
