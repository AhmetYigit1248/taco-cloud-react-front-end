const API_URL = 'https://localhost';

export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/api/admin/users`, {
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    
    return response.json();
};

export const getAllRoles = async () => {
    const response = await fetch(`${API_URL}/api/admin/roles`, {
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch roles');
    }
    
    return response.json();
};

export const addRoleToUser = async (userId, roleId) => {
    const response = await fetch(`${API_URL}/api/admin/users/${userId}/roles/${roleId}`, {
        method: 'POST',
        credentials: 'include'
    });
    
    return response.ok;
};

export const removeRoleFromUser = async (userId, roleId) => {
    const response = await fetch(`${API_URL}/api/admin/users/${userId}/roles/${roleId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    
    return response.ok;
};

export const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    
    return response.ok;
};