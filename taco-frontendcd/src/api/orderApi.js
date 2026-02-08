const API_URL = 'https://localhost';

export const createOrder = async (order) => {
    const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Sipariş oluşturulamadı');
    }
    
    return response.json();
};

export const getMyOrders = async () => {
    const response = await fetch(`${API_URL}/api/orders`, {
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Siparişler alınamadı');
    }
    
    return response.json();
};

export const patchOrder = async (orderId, patch) => {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
        credentials: 'include'
    });
    
    if (!response.ok) {
        throw new Error('Sipariş güncellenemedi');
    }
    
    return response.json();
};

export const deleteOrder = async (orderId) => {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    
    // 204 No Content başarılı silme anlamına gelir
    if (!response.ok && response.status !== 204) {
        throw new Error('Sipariş silinemedi');
    }
    
    return true; // Başarılı
};