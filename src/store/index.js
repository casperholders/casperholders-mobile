import authReducer from '@/store/reducers/authReducer';
import networkReducer from '@/store/reducers/networkReducer';
import operationsReducer from '@/store/reducers/operationsReducer';
import { configureStore } from '@reduxjs/toolkit';

/**
 * Redux store of the app.
 */
let store = undefined;

/**
 * Reset the app store.
 */
export const resetStore = () => {
  store = configureStore({
    reducer: {
      auth: authReducer,
      operations: operationsReducer,
      network: networkReducer,
    },
  });
};

resetStore();

/**
 * Get the app store.
 */
export const getStore = () => store;
