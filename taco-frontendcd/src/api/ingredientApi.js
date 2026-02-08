const API_URL = 'https://localhost';

export const getAllIngredients = async () => {
    try {
        const response = await fetch(`${API_URL}/api/ingredients`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            return [];
        }
        
        return response.json();
        
    } catch (error) {
        console.error('Ingredient error:', error);
        return [];
    }
};