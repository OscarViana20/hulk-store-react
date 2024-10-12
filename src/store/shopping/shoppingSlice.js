import { createSlice } from '@reduxjs/toolkit';

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState: {
        paymentTypes: [],
        errorMessage: undefined,
    },
    reducers: {
        onLoadPaymentTypes: (state, { payload = [] }) => {
            state.paymentTypes = payload;
            state.errorMessage = undefined;
        },
        setShoppingError: (state, { payload = null }) => {
            state.errorMessage = payload;
        }
    }
});

export const { onLoadPaymentTypes, setShoppingError } = shoppingSlice.actions;