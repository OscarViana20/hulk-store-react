import { configureStore } from '@reduxjs/toolkit';
import { authSlice, productsSlice, categoriesSlice, shoppingSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer,
        categories: categoriesSlice.reducer,
        shopping: shoppingSlice.reducer,
    },
})