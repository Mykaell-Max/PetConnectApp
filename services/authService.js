import api from './api';

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('users/login', {email, password});
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login: ", error);   
        throw error
    }
};