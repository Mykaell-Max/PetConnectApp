import api from "./api";

export const createUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchSingleUser = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const response = await api.patch(`/users/${userId}`, userData)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function uploadProfilePicture(userId, picfile) {
    try {
        const formData = new FormData();   
        formData.append('profilePicture', picfile);
        // console.log(userId);
        // console.log(picfile)
        const response = await api.post(`/users/${userId}/profilePic`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        // console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteProfilePicture(userId) {
    try {
        const response = await api.delete(`/users/${userId}/profilePic`)
        return response
    } catch (error) {
        throw error
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/${userId}`)
        return response;
    } catch (error) {
        throw error;
    }
}