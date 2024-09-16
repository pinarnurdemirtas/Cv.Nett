import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Kullanıcı için
import adminAuthReducer from './adminAuthSlice'; // Admin için

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
});
export { store }; // Named export kullanıldı