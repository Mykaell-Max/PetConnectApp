import axios from 'axios';
import { getToken } from './getToken';

const api = axios.create({
    baseURL: 'http://192.168.100.89:8000/api',
    setTimeout: '10000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken(); 
        if (token) {
            // console.log(token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;