import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        errorMessage: undefined,
    },
    reducers: {
        onLoadProducts: (state, { payload = [] }) => {
            state.products = payload;
            state.errorMessage = undefined;
        },
        onClearProducts: (state) => {
            state.products = [];
            state.errorMessage = undefined;
        },
        setProductsError: (state, { payload = null }) => {
            state.errorMessage = payload;
        }
    }
});

export const { onLoadProducts, onClearProducts, setProductsError } = productsSlice.actions;