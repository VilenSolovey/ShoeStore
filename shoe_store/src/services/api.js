import axios from 'axios';

export const fetchItems = async (searchTerm = '', sortOrder = 'desc', color = '', size = '') => {
  const response = await axios.get('http://localhost:5005/api/products', {
    params: {
      search: searchTerm,
      sort: sortOrder === 'asc' ? 'asc' : 'desc',
      color: color,
      size: size,
    },
  });
  return response;
};

export const fetchItemById = async (id) => {
  const response = await axios.get(`http://localhost:5005/api/products/${id}`);
  return response;
};
