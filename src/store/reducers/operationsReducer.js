import { createSlice } from '@reduxjs/toolkit';

const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    pendingNotificationId: undefined,
    deployResultsByHash: {},
  },
  reducers: {
    setDeployResult: (state, action) => {
      state.deployResultsByHash[action.payload.deployResult.hash] = action.payload.deployResult;
    },
    unsetDeployResult: (state, action) => {
      const lowerHash = action.payload.deployResult.hash.toLowerCase();
      if (lowerHash in state.deployResultsByHash) {
        delete state.deployResultsByHash[lowerHash];
      }
    },
    setPendingNotificationId: (state, action) => {
      state.pendingNotificationId = action.payload.notificationId;
    },
  },
});

export const {
  setDeployResult,
  unsetDeployResult,
  setPendingNotificationId,
} = operationsSlice.actions;

export default operationsSlice.reducer;
