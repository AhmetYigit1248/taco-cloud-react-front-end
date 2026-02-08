import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../api/authApi';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            checkAdminStatus();
        } else {
            setIsAdmin(false);
        }
    }, [location.pathname]); 

    const checkAdminStatus = async () => {
        try {
            const response = await fetch('https://localhost/api/admin/users', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            setIsAdmin(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout(); 
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            
            setIsLoggedIn(false);
            setIsAdmin(false);
            
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Taco Cloud</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                
                {isLoggedIn ? (
                    <>
                        <Link to="/design">Design</Link>
                        <Link to="/orders">My Orders</Link>
                        
                        {isAdmin && (
                            <Link to="/admin" className="admin-link">Admin</Link>
                        )}
                        
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;