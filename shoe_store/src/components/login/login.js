import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authOperations';
import './login.css';

const Login = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!validateEmail(value)) {
            setEmailError('Invalid email format (must contain a dot)');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (emailError) {
            setError('Please fix the errors before submitting.');
            return;
        }
        try {
            const result = await dispatch(login({ email, password })).unwrap();
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('email', email);
                navigate('/');
            }
        } catch (err) {
            setError(err || 'Failed to login. Please try again.');
        }
    };
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          navigate('/'); 
      }
  }, [navigate]);
    return (
        <div className="auth-container-wrapper">
            <div className="auth-container">
                <h2>Sign in</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p className={`error ${emailError ? 'active' : ''}`}>{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                <p>
                    I am new{' '}
                    <span onClick={() => navigate('/register')} className="switch-link">
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;