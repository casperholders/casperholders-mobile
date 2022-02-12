import AppProvider from "@/AppProvider";
import Main from "@/Main";
import TestnetAdapter from "@/services/networks/testnetAdapter";
import LocalAdapter from "@/services/signers/localAdapter";
import { getStore, resetStore } from "@/store";
import { connect } from "@/store/reducers/authReducer";
import { setNetwork } from "@/store/reducers/networkReducer";
import { TEST_LOCAL_SIGNER_KEY } from "@env";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

beforeEach(() => {
  resetStore();
});

describe("Main.js", () => {
//   test("should render login when disconnected", () => {
//     const { queryByText, toJSON } = render(<Main />, {
//       wrapper: AppProvider,
//     });

//     expect(queryByText(/connect with ledger/i)).toBeTruthy();
//     expect(queryByText(/connect locally/i)).toBeTruthy();
//     expect(queryByText(/balance/i)).toBeFalsy();

//     expect(toJSON()).toMatchSnapshot();
//   });

//   test("should render navigator when connected to mainnet", async () => {
//     getStore().dispatch(
//       connect({
//         adapterId: LocalAdapter.ID,
//         options: { privateKey: TEST_LOCAL_SIGNER_KEY },
//       })
//     );

//     const { queryByText, queryAllByText, toJSON } = render(<Main />, {
//       wrapper: AppProvider,
//     });

//     await waitFor(() => {
//       expect(queryByText(/loading.../i)).toBeFalsy();
//     });

//     expect(queryByText(/connect with ledger/i)).toBeFalsy();
//     expect(queryByText(/connect locally/i)).toBeFalsy();
//     expect(queryAllByText(/balance/i)).toBeTruthy();
//     expect(queryAllByText(/mainnet/i)).toBeTruthy();
//     expect(queryByText(/testnet/i)).toBeFalsy();

//     expect(toJSON()).toMatchSnapshot();
//   });

//   test("should render navigator when connected to testnet", async () => {
//     getStore().dispatch(
//       connect({
//         adapterId: LocalAdapter.ID,
//         options: { privateKey: TEST_LOCAL_SIGNER_KEY },
//       })
//     );

//     getStore().dispatch(
//       setNetwork({
//         network: TestnetAdapter.ID,
//       })
//     );

//     const { queryByText, queryAllByText, toJSON } = render(<Main />, {
//       wrapper: AppProvider,
//     });

//     await waitFor(() => {
//       expect(queryByText(/Loading.../i)).toBeFalsy();
//     });

//     expect(queryByText(/Connect with Ledger/i)).toBeFalsy();
//     expect(queryByText(/Connect locally/i)).toBeFalsy();
//     expect(queryAllByText(/Balance/i)).toBeTruthy();
//     expect(queryByText(/Mainnet/i)).toBeFalsy();
//     expect(queryAllByText(/Testnet/i)).toBeTruthy();
//     expect(toJSON()).toMatchSnapshot();
//   });


  test("should open the settings and render testnet text", async () => {
    getStore().dispatch(
      connect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: TEST_LOCAL_SIGNER_KEY },
      })
    );

    getStore().dispatch(
      setNetwork({
        network: TestnetAdapter.ID,
      })
    );

    const { getByTestId, getByText } = render(<Main />, {
      wrapper: AppProvider,
    });

    const button = getByTestId(/goToSettings/i);
    fireEvent.press(button);
    expect(getByText(/you are actually using the testnet/i)).toBeTruthy();
  });

  test("should render navigator operations", async () => {
    getStore().dispatch(
      connect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: TEST_LOCAL_SIGNER_KEY },
      })
    );

    getStore().dispatch(
      setNetwork({
        network: TestnetAdapter.ID,
      })
    );

    const { queryByText, queryAllByText, toJSON, getByTestId, findByText, findByTestId, getByText } = render(<Main />, {
      wrapper: AppProvider,
    });

    const goToOperationsButton = getByTestId(/goToOperations/i);
    expect(goToOperationsButton).toBeTruthy();
    fireEvent.press(goToOperationsButton);
    expect(await findByText(/choose an operation to execute/i)).toBeTruthy();
    // const balanceButton = getByTestId(/goToBalance/i);
    // fireEvent.press(balanceButton);
    // debug();
    // fireEvent(tabButton[0], 'press');
    // fireEvent(tabButton[1], 'press');

    // const transfer = await findByText('Choose an operation to execute from the list bellow');
    // console.log(transfer);
    // expect(transfer).toBeTruthy();
  });
});
