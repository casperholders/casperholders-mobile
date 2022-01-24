import signerManager from '@/services/newSigners/signerManager';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    connected: false,
    adapterId: undefined,
    options: undefined,
  },
  reducers: {
    connect: (state, action) => {
      state.adapterId = action.payload.adapterId;
      state.options = action.payload.options;
      state.connected = true;
    },
    disconnect: (state) => {
      state.connected = false;
      state.options = undefined;
      state.adapterId = undefined;
    },
  },
});

export const { connect, disconnect } = authSlice.actions;

export const selectConnected = (state) => state.auth.connected;

export const selectAdapter = (state) => signerManager.adapter(state.auth.adapterId);

export const selectOptions = (state) => state.auth.options;

export const selectPublicKey = (state) => selectAdapter(state).computePublicKey(selectOptions(state));

export default authSlice.reducer;
