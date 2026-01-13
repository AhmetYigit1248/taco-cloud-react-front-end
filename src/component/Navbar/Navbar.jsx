import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../api/authApi';
import './Navbar.css';
import { useLocation } from 'react-router-dom';

function Navbar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [location.pathname]);

    const checkAuth = async () => {
        try {
            const response = await fetch('https://localhost/api/tacos', {
                credentials: 'include'
            });
            
            if (response.status === 200) {
                setIsLoggedIn(true);
                
                const adminResponse = await fetch('https://localhost/api/admin/users', {
                    credentials: 'include'
                });
                setIsAdmin(adminResponse.status === 200);
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        navigate('/login');
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