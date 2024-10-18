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

export const createPet = async (petData, pictures) => {
    try {
        const formData = new FormData();
        
        formData.append('petData', JSON.stringify(petData));
        
        pictures.forEach((picture) => {
            formData.append('petPictures', picture);
        });

        const response = await api.post('/pets/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};