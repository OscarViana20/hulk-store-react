import { useDispatch, useSelector } from 'react-redux';
import { hulkStoreApi } from '../api';
import { onLoadPaymentTypes, setShoppingError } from '../store';

export const useShoppingStore = () => {
    const dispatch = useDispatch();

    const { paymentTypes, errorMessage } = useSelector(state => state.shopping);

    const startLoadingPaymentTypes = async () => {
        try {
            const { data } = await hulkStoreApi.get('/api/paymentType/findAllPaymentType');
            dispatch(onLoadPaymentTypes(data));
        } catch {
            dispatch(setShoppingError('Error loading payment types'));
            setTimeout(() => dispatch(setShoppingError()), 10);
        }
    }

    return {
        //* properties
        paymentTypes,
        errorMessage,

        //* methods
        startLoadingPaymentTypes,
    };

}