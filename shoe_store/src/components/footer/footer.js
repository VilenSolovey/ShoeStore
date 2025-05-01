import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; 
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Email: shoeluxe@gmail.com</p>
        <p>Phone: +380 (382) 123 489</p>

        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ShoeLuxe. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;