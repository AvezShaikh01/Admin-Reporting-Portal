import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import reportReducer from './slices/reportSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    reports: reportReducer,
  },
});
