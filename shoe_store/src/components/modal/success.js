import React from 'react';
import { Link } from 'react-router-dom';
import './success.css';

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-icon">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
     </svg>
      </div>
      <h2>Success!</h2>
      <p>Your order was sent to processing!</p>
      <p>Check your email box for further information.</p>
      <Link to="/services" className="back-button">
        Go back to Catalog
      </Link>
    </div>
  );
};

export default SuccessPage;
