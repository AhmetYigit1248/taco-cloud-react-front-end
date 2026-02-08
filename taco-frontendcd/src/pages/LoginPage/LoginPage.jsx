import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [uiState, setUiState] = useState({
        loading: false,
        error: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (uiState.error) {
            setUiState(prev => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setUiState(prev => ({ ...prev, error: 'Please enter both username and password.' }));
            return;
        }

        setUiState({ loading: true, error: null });

        try {
            const success = await login(formData.username, formData.password);

            if (success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', formData.username);

                navigate('/design', { replace: true });
            } else {
                setUiState({ loading: false, error: 'Unable to login. Check your username and password.' });
            }
        } catch (err) {
            setUiState({ loading: false, error: 'A network error occurred. Please try again later.' });
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://localhost/oauth2/authorization/google';
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <img src="/images/Capture.png" alt="Taco Cloud" />

            {uiState.error && (
                <div className="error-message" role="alert">
                    {uiState.error}
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
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={uiState.loading} // İşlem sırasında input kilitlenir
                        autoComplete="username"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={uiState.loading}
                        autoComplete="current-password"
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-btn" // CSS'te stil verilmeli
                    disabled={uiState.loading} // Çift tıklamayı önler
                >
                    {uiState.loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="divider">OR</div>

            <button 
                onClick={handleGoogleLogin} 
                className="google-btn"
                disabled={uiState.loading}
                type="button"
            >
                Sign in with Google
            </button>
        </div>
    );
}

export default LoginPage;