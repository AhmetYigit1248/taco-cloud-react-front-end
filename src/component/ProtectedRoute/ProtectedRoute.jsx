import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        console.log('ProtectedRoute: Checking auth...');
        
        fetch('http://localhost:8080/api/tacos', { 
            credentials: 'include' 
        })
        .then(res => {
            console.log('ProtectedRoute: Response status:', res.status);
            setAuth(res.ok);
        })
        .catch(err => {
            console.log('ProtectedRoute: Error:', err);
            setAuth(false);
        });
    }, []);

    console.log('ProtectedRoute: auth =', auth);

    if (auth === null) {
        return <p>Loading...</p>;
    }
    
    if (!auth) {
        console.log('ProtectedRoute: Not authenticated, redirecting to /login');
        return <Navigate to="/login" />;
    }
    
    console.log('ProtectedRoute: Authenticated, showing page');
    return children;
}

export default ProtectedRoute;