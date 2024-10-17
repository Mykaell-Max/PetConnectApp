import api from './api';

export const fetchPets = async () => {
    try {
        const response = await api.get('/pets/searchAll');
        return response.data;
    } catch (error) {   
        throw error
    }
};

export const fetchSinglePet = async (petId) => {
    try {
        const response = await api.get(`/pets/${petId}`);
        return response.data;
    } catch (error) {
        throw error
    }
}