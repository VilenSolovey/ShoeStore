import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authOperations';
import './register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
            setEmailError('Invalid email format (must contain a dot).');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
        }
    };

    const handleRegister = async (e) => {
      e.preventDefault();
  
      if (emailError || passwordError) {
          setError('Please fix the errors before submitting.');
          return;
      }
  
      if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
      }
  
      try {
          await dispatch(register({ username, email, password })).unwrap();
  
          navigate('/login');
      } catch (err) {
          setError(err.message || 'Failed to register. Please try again.');
      }
  };
    return (
        <div className="auth-container-wrapper">
            <div className="auth-container">
                <h2>Sign up</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p className={`error ${emailError ? 'active' : ''}`}>{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && <p className={`error ${passwordError ? 'active' : ''}`}>{passwordError}</p>}

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    I already sign up{' '}
                    <span onClick={() => navigate('/login')} className="switch-link">
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;