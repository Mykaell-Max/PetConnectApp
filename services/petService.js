import api from './api';

export const fetchPets = async () => {
    try {
        const response = await api.get('/pets/searchAll');
        return response.data;
    } catch (error) {   
        throw error
    }
};