import { configureStore } from '@reduxjs/toolkit'
import authApi from './feature/auth/authApi'
import  authSlice  from './feature/auth/authSlice';
import productApi from './feature/product/productApi';
import reviewApi from './feature/review/reviewApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth : authSlice,
        [productApi.reducerPath] : productApi.reducer,
        [ reviewApi.reducerPath] : reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,productApi.middleware,reviewApi.middleware),

});