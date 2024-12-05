import { configureStore } from '@reduxjs/toolkit'
import authApi from './feature/auth/authApi'
import  authSlice  from './feature/auth/authSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth : authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),

});