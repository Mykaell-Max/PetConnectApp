import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.100.89:8000/api',
    setTimeout: '10000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;