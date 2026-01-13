import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await login(username, password);
        
        if (success) {
            navigate('/design');  // /design sayfasına yönlendir
        } else {
            setError(true);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <img src="/images/Capture.png" alt="Taco Cloud" />

            {error && (
                <div className="error-message">
                    Unable to login. Check your username and password.
                </div>
            )}

            <p>
                New here? Click <Link to="/register">here</Link> to register.
            </p>

            <form onSubmit={handleSubmit} id="loginForm">
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Login" />
            </form>

            <button 
                onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'} 
                className="google-btn"
            >
                Sign in with Google
            </button>
        </div>
    );
}

export default LoginPage;