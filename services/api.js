import axios from 'axi';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    setTimeout: '10000'
});

export default api;