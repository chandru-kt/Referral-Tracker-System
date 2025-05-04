import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../features/candidates/candidateSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidateReducer,
  },
});
