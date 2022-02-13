import AppProvider from '@/AppProvider';
import Main from '@/Main';
import { resetStore } from '@/store';
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

describe('Read only', () => {

  test('should connect with public key', async () => {
    const { queryByText, queryAllByText, getByTestId, debug, toJSON } = render(<Main />, {
      wrapper: AppProvider,
    });
    expect(queryAllByText(/connect with ledger/i)).toBeTruthy();
    expect(queryAllByText(/connect locally/i)).toBeTruthy();
    expect(queryByText(/balance/i)).toBeFalsy();
    const publicKeyInput = getByTestId(/publicKeyInput/i);
    const localConnectSubmit = getByTestId(/localConnectSubmit/i);
    expect(publicKeyInput).toBeTruthy();

    fireEvent.changeText(publicKeyInput, '01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c');

    fireEvent.press(localConnectSubmit);

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

    expect(queryAllByText(/connect with ledger/i)).toBeTruthy();
    expect(queryAllByText(/connect locally/i)).toBeTruthy();
    expect(queryByText(/balance/i)).toBeFalsy();
  });
});
