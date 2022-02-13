import AppProvider from '@/AppProvider';
import StakeBalanceCard from '@/components/balance/StakeBalanceCard';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { render } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Stake balance card', () => {
  test('should render stake balance card', () => {
    getStore().dispatch(
      connect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: TEST_LOCAL_SIGNER_KEY },
      }),
    );

    const validator = {
      png: '',
      name: 'CasperHolders',
      publicKey: '0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5',
      group: 'Active',
      delegation_rate: '0',
      staked_amount: '253.00',
    };

    const { debug, queryByText, toJSON } = render(<StakeBalanceCard
      validator={'CasperHolders'}
      image={'https://node.casperholders.com/.well-known/casper/squarelogo256.png'}
      staked={100}
      formattedPercentOfTotal={'1'}
      delegationRate={'0'}
    />, {
      wrapper: AppProvider,
    });
    expect(queryByText(/Validator CasperHolders/i)).toBeTruthy();
    expect(queryByText(/1% of your staked funds - 0% fee/i)).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});