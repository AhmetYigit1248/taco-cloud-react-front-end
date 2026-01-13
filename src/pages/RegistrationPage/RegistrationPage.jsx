import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';
import './RegistrationPage.css';

function RegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: '',
        fullname: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            const success = await register(formData);
            if (success) {
                navigate('/login');
            } else {
                setError('Registration failed');
            }
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="registration-page">
            <h1>Register</h1>
            <img src="/images/Capture.png" alt="Taco Cloud" />

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} id="registerForm">
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm">Confirm password: </label>
                    <input
                        type="password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Full name: </label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="street">Street: </label>
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State: </label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip: </label>
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone: </label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default RegistrationPage;