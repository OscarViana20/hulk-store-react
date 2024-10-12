import { useDispatch, useSelector } from 'react-redux';
import { hulkStoreApi } from '../api';
import { onLoadCategories, setProductsError } from '../store';

export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { categories, errorMessage } = useSelector(state => state.categories);

    const startLoadingCategories = async () => {
        try {
            const { data } = await hulkStoreApi.get('/api/category/findAllCategories');
            dispatch(onLoadCategories(data));
        } catch {
            dispatch(setProductsError('Error loading categories'));
            setTimeout(() => dispatch(setProductsError()), 10);
        }
    }

    return {
        //* properties
        categories,
        errorMessage,

        //* methods
        startLoadingCategories,
    };

}