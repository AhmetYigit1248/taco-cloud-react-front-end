const API_URL = 'https://localhost';

export const getRecentTacos = async () => {
    const response = await fetch(`${API_URL}/api/tacos?recent`, {
        credentials: 'include'
    });
    return response.json();
};

export const getAllTacos = async () => {
    const response = await fetch(`${API_URL}/api/tacos`, {
        credentials: 'include'
    });
    return response.json();
};

export const getTacoById = async (id) => {
    const response = await fetch(`${API_URL}/api/tacos/${id}`, {
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Taco bulunamadı');
    }
    
    return response.json();
};

export const createTaco = async (taco) => {
    const response = await fetch(`${API_URL}/api/tacos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taco),
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Taco oluşturulamadı');
    }
    
    return response.json();
};

export const updateTaco = async (id, taco) => {
    const response = await fetch(`${API_URL}/api/tacos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taco),
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Taco güncellenemedi');
    }
    
    return response.json();
};

export const deleteTaco = async (id) => {
    const response = await fetch(`${API_URL}/api/tacos/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Taco silinemedi');
    }
    
    return true;
};