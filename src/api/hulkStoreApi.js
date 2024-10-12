import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const hulkStoreApi = axios.create({
    baseURL: VITE_API_URL
});

hulkStoreApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': localStorage.getItem('token')
    }
    return config;
})


export default hulkStoreApi;