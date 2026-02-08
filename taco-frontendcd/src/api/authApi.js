const API_URL = 'https://localhost';

export const login = async (username, password) => {
    if (!username || !password) {
        return false;
    }

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data.success;
        }
        
        // Hata detayını konsolda görmek için:
        console.error("Login failed:", await response.text());
        return false;
        
    } catch (error) {
        console.error('Login network error:', error);
        return false;
    }
};

export const logout = async () => {
    try {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/api/register`, {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    });
    return response.ok;
};