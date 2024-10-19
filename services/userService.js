import api from "./api";

export const createUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData)
        return response.data;
    } catch (error) {
        throw error;
    }
}