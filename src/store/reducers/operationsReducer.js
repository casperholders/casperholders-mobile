import { createSlice } from '@reduxjs/toolkit';

const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    deployResultsByHash: {},
  },
  reducers: {
    setDeployResult: (state, action) => {
      state.deployResultsByHash[action.payload.deployResult.hash] = action.payload.deployResult;
    },
    unsetDeployResult: (state, action) => {
      const lowerHash = action.payload.deployResult.hash.toLowerCase();
      if (lowerHash in state.deployResultsByHash) {
        const {
          [action.payload.deployResult.hash.toLowerCase()]: _,
          ...newDeployResults
        } = state.deployResultsByHash;
        return newDeployResults;
      }
    },
  },
});

export const { setDeployResult, unsetDeployResult } = operationsSlice.actions;

export default operationsSlice.reducer;
