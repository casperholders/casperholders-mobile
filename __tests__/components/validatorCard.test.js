import ValidatorCard from '@/components/ValidatorCard';
import { resetStore } from '@/store';
import { render } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Validator card', () => {
  test('should render Validator card', () => {
    const validator = {
      png: 'https://node.casperholders.com/.well-known/casper/squarelogo256.png',
      name: 'CasperHolders',
      publicKey: '0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5',
      group: 'Active',
      delegation_rate: '0',
      staked_amount: '253.00',
    };

    const { queryByText, toJSON } = render(<ValidatorCard validator={validator} />);
    expect(queryByText(/CasperHolders/i)).toBeTruthy();
    expect(queryByText(/0124bfdae2ed128fa5e4057bc398e4933329570e47240e57fc92f5611a6178eba5/i)).toBeTruthy();
    expect(queryByText(/Active/i)).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});