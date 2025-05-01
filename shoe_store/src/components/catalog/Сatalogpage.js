import React, { useState, useEffect, useCallback, useRef } from 'react';
import CatalogItem from '../catalog/catalogItem/catalogItem';
import { fetchItems } from '../../services/api';
import InputComponent from './inputСomponents/inputcomponent';
import SelectComponent from './selectComponent/selectComponent';
import SortButton from './sortbutton/sortbutton';
import Loader from '../loader/Loader';
import './Catalog.css';

const Catalog = () => {
  const [items, setItems] = useState([]); 
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  const [loading, setLoading] = useState(false);
  const fetchTimeout = useRef(null);

  const fetchData = useCallback(() => {
    setLoading(true);

    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current);
    }

    fetchTimeout.current = setTimeout(async () => {
      try {
        const response = await fetchItems(searchTerm, sortOrder, selectedColor, selectedSize);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
      setLoading(false);
    }, 500);
  }, [searchTerm, sortOrder, selectedColor, selectedSize]);

  useEffect(() => {
    fetchData();

    return () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }
    };
  }, [fetchData]); 

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesColor = selectedColor ? item.colors.includes(selectedColor) : true;
    const matchesSize = selectedSize ? item.sizes.includes(selectedSize) : true;
    return matchesSearch && matchesColor && matchesSize;
  });
  

  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <div className="catalog">
      <div className="filters">
        <InputComponent
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="search-bar"
        />
        <SelectComponent
          value={selectedColor}
          onChange={handleColorChange}
          className="filter-select"
          options={[
            { value: '', label: 'All Colors' },
            { value: 'black', label: 'Black' },
            { value: 'red', label: 'Red' },
            { value: 'gray', label: 'Gray' }
          ]}
        />
        <SelectComponent
          value={selectedSize}
          onChange={handleSizeChange}
          className="filter-select"
          options={[
            { value: '', label: 'All Sizes' },
            { value: '43', label: '43' },
            { value: '44', label: '44' },
            { value: '45', label: '45' }
          ]}
        />
        <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
      </div>
      {loading ? (
        <Loader /> 
      ) : (
        <div className="catalog-items">
          {sortedItems.length > 0 ? (
            sortedItems.map((item, index) => (
              <CatalogItem
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                size={item.size}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            ))
          ) : (
            <p>No items match your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalog;
