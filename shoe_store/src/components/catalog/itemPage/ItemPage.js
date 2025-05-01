import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemById } from '../../../services/api';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../../../redux/cartAction'; 
import './itemCatalog.css';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(''); 
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);
  const [displayedPrice, setDisplayedPrice] = useState(0); 

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchItemById(id);
      setItem(response.data);
      setDisplayedPrice(response.data.price); 
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [id]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  useEffect(() => {
    if (item) {
      setDisplayedPrice(item.price * count);
    }
  }, [count, item]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
        alert('Please select both color and size');
        return;
    }

    const itemWithSelection = { ...item, selectedColor, selectedSize, count };
    dispatch(addToCart(itemWithSelection));
    navigate('/cart');
  };

  if (loading) return <p>Loading...</p>; 
  if (!item) return <p>Item not found</p>; 

  return (
    <div className="item-page">
      <div className="item-image-container">
        <img src={item.imageUrl} alt={item.title} className="item-image" />
        <p className="price">Price: ${displayedPrice.toFixed(2)}</p>
      </div>
      <div className="item-details">
        <div className="characteristics">
          <span className="characteristic">
            Size: 
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Select size</option>
              {Array.isArray(item.sizes) && item.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </span>
          <span className="characteristic">
            Color: 
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Select color</option>
              {Array.isArray(item.colors) && item.colors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>
          </span>
        </div>
        <h1>{item.title}</h1>
        <p className="description">{item.description}</p>
        <div className="countable-field">
          <label>Count</label>
          <input 
            type="number" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))} 
          />
        </div>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>Go back</button>
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;