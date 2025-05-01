import React from 'react';

const SortButton = ({ sortOrder, toggleSortOrder }) => {
  return (
    <button className="sort-button" onClick={toggleSortOrder}>
      Sort by Price: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
    </button>
  );
};

export default SortButton;
