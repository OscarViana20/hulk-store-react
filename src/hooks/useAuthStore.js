import { useDispatch, useSelector } from 'react-redux';
import { hulkStoreApi } from '../api'
import { onLogin, onLogout, clearErrorMessage } from '../store';

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { user, status, errorMessage } = useSelector(state => state.auth);

    const startLogin = async ({ username, password }) => {
        try {
            const { headers } = await hulkStoreApi.post('/login', { username, password });
            localStorage.setItem('token', headers.get('Authorization'));
            localStorage.setItem('username', username);
            dispatch(onLogin({ username }));
        } catch {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => dispatch(clearErrorMessage()), 10);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //* properties
        user,
        status,
        errorMessage,

        //* methods
        startLogin,
        startLogout,
    }
}