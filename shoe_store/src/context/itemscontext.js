import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Adidas AirForce',
      price: 135,
      description: 'High quality running shoes.',
      imageUrl: require('../images/adidas.png'),
      color: 'black',
      size: '43'
    },
    {
      id: 2,
      title: 'Adidas Joker',
      price: 111,
      description: 'Comfortable sneakers for everyday wear.',
      imageUrl: require('../images/adidas2.png'),
      color: 'black',
      size: '44'
    },
    {
      id: 3,
      title: 'Adidas Sport',
      price: 192,
      description: 'Perfect for training sessions.',
      imageUrl: require('../images/adidas3.png'),
      color: 'black',
      size: '43'
    },
    {
      id: 4,
      title: 'Adidas Modern',
      price: 162,
      description: 'Classic design with a modern touch.',
      imageUrl: require('../images/adidas4.png'),
      color: 'black',
      size: '45'
    },
    {
      id: 5,
      title: 'Jog',
      price: 142,
      description: 'Lightweight t-shirt for all activities.',
      imageUrl: require('../images/Jog.png'),
      color: 'black',
      size: '43'
    },
    {
      id: 6,
      title: 'Jog Air',
      price: 153,
      description: 'Waterproof jacket for outdoor adventures.',
      imageUrl: require('../images/Jog2.png'),
      color: 'red',
      size: '45'
    },
    {
      id: 7,
      title: 'Nike Every',
      price: 232,
      description: 'Classic canvas shoes for everyday wear.',
      imageUrl: require('../images/nike2.png'),
      color: 'black',
      size: '43'
    },
    {
      id: 8,
      title: 'Nike Black',
      price: 193,
      description: 'Premium running shoes for long distances.',
      imageUrl: require('../images/nike3.png'),
      color: 'black',
      size: '45'
    },
    {
      id: 9,
      title: 'Jog Sneakers',
      price: 193,
      description: 'Comfortable and stylish sneakers.',
      imageUrl: require('../images/Jog3.png'),
      color: 'black',
      size: '43'
    },
    {
      id: 10,
      title: 'Jog Harmly',
      price: 182,
      description: 'Warm hoodie for cold weather.',
      imageUrl: require('../images/Jog4.png'),
      color: 'gray',
      size: '44'
    },
  ]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};