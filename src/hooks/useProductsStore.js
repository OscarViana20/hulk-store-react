import { useDispatch, useSelector } from 'react-redux';
import { hulkStoreApi } from '../api';
import { onLoadProducts, onClearProducts, setProductsError } from '../store';

export const useProductsStore = () => {
    const dispatch = useDispatch();

    const { products, errorMessage } = useSelector(state => state.products);

    const startLoadingProducts = async () => {
        try {
            const { data } = await hulkStoreApi.get('/api/product/findAvailableProducts');
            dispatch(onLoadProducts(data));
        } catch {
            dispatch(setProductsError('Error loading products'));
            setTimeout(() => dispatch(setProductsError()), 10);
        }
    }

    const startLoadingStockProducts = async () => {
        try {
            const { data } = await hulkStoreApi.get('/api/product/findStockProducts');
            dispatch(onLoadProducts(data));
        } catch {
            dispatch(setProductsError('Error loading stock products'));
            setTimeout(() => dispatch(setProductsError()), 10);
        }
    }

    const startSavingProduct = async (product) => {
        try {
            await hulkStoreApi.post('/api/product/createProduct', product);
            dispatch(onClearProducts());
        } catch {
            dispatch(setProductsError('Error saving product'));
            setTimeout(() => dispatch(setProductsError()), 10);
        }
    }

    const startUpdatingProduct = async (product) => {
        try {
            await hulkStoreApi.post('/api/product/updateProduct', product);
            dispatch(onClearProducts());
        } catch {
            dispatch(setProductsError('Error updating product'));
            setTimeout(() => dispatch(setProductsError()), 10);
        }
    }

    const startDeletingProduct = async (product) => {
        try {
            await hulkStoreApi.post('/api/product/inactivateProduct', product);
            dispatch(onClearProducts());
        } catch {
            dispatch(setProductsError('Error deleting product'));
            setTimeout(() => dispatch(setProductsError()), 10);
        }
    }

    return {
        //* properties
        products,
        errorMessage,

        //* methods
        startLoadingProducts,
        startLoadingStockProducts,
        startSavingProduct,
        startUpdatingProduct,
        startDeletingProduct,
    };

}