import { DeployResult } from '@casperholders/core';
import { createSlice } from '@reduxjs/toolkit';
import Big from 'big.js';

const testDeployResult = new DeployResult(
  '1bea8e1fcf4613f2f07b2b26dc1de19b7a3a84c84e39d69a5bd15716bebf132d', 'Transfer Operation',
);
testDeployResult.cost = Big(0.1);
testDeployResult.status = 'Unknown'; // Unknown, Success, Failure
testDeployResult.message = '';
testDeployResult.amount = Big(2.5);

const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    deployResultsByHash: {
      // [testDeployResult.hash]: convertDeployResultToObject(testDeployResult),
    },
  },
  reducers: {
    setDeployResult: (state, action) => {
      state.deployResultsByHash[action.payload.deployResult.hash] = action.payload.deployResult;
    },
    unsetDeployResult: (state, action) => {
      const {
        [action.payload.deployResult.hash.toLowerCase()]: _,
        ...newDeployResults
      } = state.deployResultsByHash;
      return newDeployResults;
    },
  },
});

export const { setDeployResult, unsetDeployResult } = operationsSlice.actions;

export default operationsSlice.reducer;
