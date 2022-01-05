import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    connected: false,
    signerId: undefined,
    activeKey: undefined,
  },
  reducers: {
    connect: (state, action) => {
      state.signerId = action.payload.signerId;
      state.activeKey = action.payload.key;
      state.connected = true;
    },
    disconnect: (state) => {
      state.connected = false;
      state.activeKey = undefined;
      state.signerId = undefined;
    },
  },
});

export const { connect, disconnect } = authSlice.actions;

export default authSlice.reducer;
