import AppProvider from '@/AppProvider';
import deployResultToObject from '@/helpers/deployResultToObject';
import Main from '@/Main';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import LocalAdapter from '@/services/signers/localAdapter';
import { getStore, resetStore } from '@/store';
import { connect } from '@/store/reducers/authReducer';
import { setNetwork } from '@/store/reducers/networkReducer';
import { setDeployResult, unsetDeployResult } from '@/store/reducers/operationsReducer';
import { TransferResult } from '@casperholders/core';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { act, render, waitFor } from '@testing-library/react-native';

beforeEach(() => {
  resetStore();
});

jest.setTimeout(500000);

describe('Main.js', () => {
  test('Should history tab', async () => {
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

    const deployResult = new TransferResult('04f8a43e38b9e96c3e1bfc3c8bd4ce3e8ba023432ea9823ec081557a3771643e');

    const {
      findByTestId,
      queryByText,
      queryAllByText,
      debug,
    } = render(<Main initialRoute="HistoryTab" />, {
      wrapper: AppProvider,
    });

    //Verify recent operation doesn't show anything
    expect(queryByText(/No recent operation available./i)).toBeTruthy();

    await waitFor(() => {
      expect(queryByText(/Loading operations/i)).toBeFalsy();
    }, { timeout: 10000 });

    await act(async () => {
      getStore().dispatch(setDeployResult({
        deployResult: deployResultToObject(deployResult),
      }));
    });

    //Verify recent operation show the deploy result
    expect(queryByText(/Waiting event/i)).toBeTruthy();


    await act(async () => {
      getStore().dispatch(unsetDeployResult({
        deployResult: deployResultToObject(deployResult),
      }));
    });

    //Verify recent operation doesn't show anything
    expect(queryByText(/No recent operation available./i)).toBeTruthy();

    //Verify recent operation show the deploy result
    expect(queryByText(/past operations./i)).toBeTruthy();
  });
});
