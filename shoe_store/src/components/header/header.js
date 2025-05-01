import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../services/authOperations';
import logo from '../../images/logo.png';
import './header.css';

function Header() {
    const [nickname, setNickname] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchUserData(token)
                .then((data) => {
                    setNickname(data.username); 
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setNickname(null);
        navigate('/login');
    };

    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Catalog</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li className="user-info">
                        {nickname ? (
                            <>
                                <span className="user-nickname">Hi, {nickname}!</span>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
