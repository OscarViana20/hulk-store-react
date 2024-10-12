import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        category: {},
        categories: [],
        errorMessage: undefined,
    },
    reducers: {
        onLoadCategories: (state, { payload = []}) => {
            state.categories = payload;
            state.errorMessage = undefined;
        },
        setCategoriesErro: (state, {payload = null}) => {
            state.errorMessage = payload;
        }
    }
});

export const { onLoadCategories, setCategoriesErro } = categoriesSlice.actions;