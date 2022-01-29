import authReducer from '@/store/reducers/authReducer';
import networkReducer from '@/store/reducers/networkReducer';
import operationsReducer from '@/store/reducers/operationsReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    auth: authReducer,
    operations: operationsReducer,
    network: networkReducer,
  },
});
