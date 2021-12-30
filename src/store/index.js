import authReducer from '@/store/reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
