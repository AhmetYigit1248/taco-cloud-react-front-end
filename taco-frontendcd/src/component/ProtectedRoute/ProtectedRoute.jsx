import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const API_BASE_URL = 'https://localhost'; 

function ProtectedRoute({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
             console.log('ProtectedRoute: LocalStorage boş, direkt login\'e atılıyor.');
             setAuth(false);
             return;
        }

        fetch(`${API_BASE_URL}/api/tacos`, { 
            method: 'GET',
            credentials: 'include' 
        })
        .then(res => {
            console.log('ProtectedRoute: API Status:', res.status);
            if (res.ok) {
                setAuth(true);
            } else {
                localStorage.removeItem('isLoggedIn');
                setAuth(false);
            }
        })
        .catch(err => {
            console.error('ProtectedRoute: Network Error:', err);
            setAuth(false);
        });
    }, []);

    if (auth === null) {
        return <div className="loading-screen">Yükleniyor...</div>;
    }
    
    if (!auth) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}

export default ProtectedRoute;