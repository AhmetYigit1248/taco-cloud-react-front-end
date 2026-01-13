const API_URL = 'https://localhost';

// GET /design - Tüm malzemeleri getir
export const getAllIngredients = async () => {
    const response = await fetch(`${API_URL}/design`, {
        credentials: 'include'
    });
    return response.json();
};