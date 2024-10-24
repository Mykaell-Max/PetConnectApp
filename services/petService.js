import api from './api';

export const fetchPets = async (query = '') => {
    try {
        const response = await api.get(`/pets/searchAll${query ? `?${query}` : ''}`);
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
        console.log('aq')
        const response = await api.post('/pets/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.message)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePet = async (petId, data, newPictures = []) => {
    try {
        const response = await api.patch(`/pets/${petId}`, data);
        if (newPictures.length > 0) {
            
            const formData = new FormData();    
        
            formData.append('petPictures', JSON.stringify(newPictures));
            
            newPictures.forEach((picture) => {
                formData.append('petPictures', picture);
            });
            
            await api.post(`/pets/${petId}/picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } 
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deletePet = async (petId, data) => {
    try {
        const response = await api.delete(`/pets/${petId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addAdoptionRequest = async (petId, userId) => {
    try {
        const response = await api.patch(`/pets/${petId}/adoption-request`, { adopterId: userId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeAdoptionRequest = async (petId, userId) => {
    try {
        const response = await api.delete(`/pets/${petId}/adoption-request`, {
            params: { adopterId: userId }  
        });
        return response
    } catch (error) {
        throw error;
    }
};

export const deletePetPicture = async (petId, pictureUrl) => {
    try {
        const response = await api.delete(`/pets/${petId}/picture`, {
            params: { pictureUrl: pictureUrl }  
        });
        return response
    } catch (error) {
        throw error;
    }
};