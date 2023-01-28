import AppProvider from '@/AppProvider';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react-native';

jest.setTimeout(500000);

describe('NFTsScreen.js', () => {
  beforeEach(() => {
    resetStore();

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
  });

  test('Should add and list a CEP47 NFTs collection', async () => {
    const TOKEN_HASH = '154e4d8785b014ea6a582fccd93fce7807266aa622c9945a5e877512714b84ab';

    const view = render(<Main initialRoute="NFTsTab" />, {
      wrapper: AppProvider,
    });

    await waitFor(() => expect(view.getByText(/No tracked NFTs collection for now/i)).toBeTruthy(), {
      timeout: 15000,
    });

    const selector = within(view.getByTestId('nftSelector'));
    const collections = within(view.getByTestId('nftCollections'));

    const tokenSearch = selector.getByTestId('nftTokenSearch');
    expect(tokenSearch).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(tokenSearch, TOKEN_HASH);

      await waitFor(() => expect(selector.getByText(/testch/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenListItem = selector.getByText(/testch/i);
    expect(tokenListItem).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenListItem);

      await waitFor(() => expect(collections.getByText(/testch/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenCollection = collections.getByText(/testch/i);
    expect(tokenCollection).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenCollection);

      await waitFor(() => expect(collections.getByText(/1/i)).toBeTruthy(), {
        timeout: 15000,
      });

      await waitFor(() => expect(collections.getByText(/2/i)).toBeTruthy(), {
        timeout: 15000,
      });

      await waitFor(() => expect(collections.getByText(/3/i)).toBeTruthy(), {
        timeout: 15000,
      });

      await waitFor(() => expect(collections.getByText(/4/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenCollectionRemove = collections.getByTestId('nftCollectionRemove');
    expect(tokenCollectionRemove).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenCollectionRemove);

      await waitFor(() => expect(view.getByText(/No tracked NFTs collection for now/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });
  });

  test('Should add and list a CEP78 NFTs collection', async () => {
    const TOKEN_HASH = 'ff55911bd5aa32df71fd3907bbd39588a5f0b476eedb21c86e6376c86a3ae896';

    const view = render(<Main initialRoute="NFTsTab" />, {
      wrapper: AppProvider,
    });

    await waitFor(() => expect(view.getByText(/No tracked NFTs collection for now/i)).toBeTruthy(), {
      timeout: 15000,
    });

    const selector = within(view.getByTestId('nftSelector'));
    const collections = within(view.getByTestId('nftCollections'));

    const tokenSearch = selector.getByTestId('nftTokenSearch');
    expect(tokenSearch).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(tokenSearch, TOKEN_HASH);

      await waitFor(() => expect(selector.getByText(/test78ch/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenListItem = selector.getByText(/test78ch/i);
    expect(tokenListItem).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenListItem);

      await waitFor(() => expect(collections.getByText(/test78ch/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenCollection = collections.getByText(/test78ch/i);
    expect(tokenCollection).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenCollection);

      await waitFor(() => expect(collections.getByText(/John Doe/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenCollectionLoad = collections.getByTestId('nftCollectionLoad');
    expect(tokenCollectionLoad).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenCollectionLoad);

      await waitFor(() => expect(view.getByText(/Carac Test/i)).toBeTruthy(), {
        timeout: 15000,
      });

      await waitFor(() => expect(view.getByText(/The Genesis Empire is a representation/i)).toBeTruthy(), {
        timeout: 15000,
      });

      await waitFor(() => expect(view.getByText(/Eye Colour/i)).toBeTruthy(), {
        timeout: 15000,
      });

      await waitFor(() => expect(view.getByText(/Green/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });

    const tokenCollectionRemove = collections.getByTestId('nftCollectionRemove');
    expect(tokenCollectionRemove).toBeTruthy();

    await act(async () => {
      fireEvent.press(tokenCollectionRemove);

      await waitFor(() => expect(view.getByText(/No tracked NFTs collection for now/i)).toBeTruthy(), {
        timeout: 15000,
      });
    });
  });
});
