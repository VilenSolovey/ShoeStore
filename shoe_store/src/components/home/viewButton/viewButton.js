import React from 'react';
import '../shoes/shoes.css';

const ViewMoreButton = ({ onClick }) => {
    return (
        <button className="view-more-button" onClick={onClick}>
            View More
        </button>
    );
};

export default ViewMoreButton;