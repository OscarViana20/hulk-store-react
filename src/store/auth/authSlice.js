import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        status: 'not-authenticated',
        errorMessage: undefined,
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.user = payload;
            state.status = 'authenticated';
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.user = {};
            state.status = 'not-authenticated';
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onLogin, onLogout, clearErrorMessage } = authSlice.actions;