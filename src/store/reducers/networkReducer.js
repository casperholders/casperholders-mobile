import MainnetAdapter from '@/services/networks/mainnetAdapter';
import NetworkManager from '@/services/networks/networkManager';
import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    networkId: MainnetAdapter.ID,
  },
  reducers: {
    setNetwork: (state, action) => {
      state.networkId = action.payload.network;
    },
  },
});

export const { setNetwork } = networkSlice.actions;

export const selectNetwork = (state) => {
  return NetworkManager.adapter(state.network.networkId);
};

export default networkSlice.reducer;
