const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5005;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'my_secret_key';
app.use(cors());
app.use(express.json());
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));


let users = [
  {
    email: "example@mail.com",
    password: "hashed_password",
    username: "User1",
    cart: [] 
  }
];

let products = [
  {
      id: 1,
      title: 'Adidas AirForce',
      price: 135,
      description: 'High quality running shoes.',
      imageUrl: '/images/adidas.png',
      colors: ['black', 'white', 'blue'], 
      sizes: ['43', '44', '45'], 
  },
  {
      id: 2,
      title: 'Adidas Joker',
      price: 111,
      description: 'Comfortable sneakers for everyday wear.',
      imageUrl: '/images/adidas2.png',
      colors: ['black', 'red', 'green'], 
      sizes: ['44', '45'], 
  },
  {
      id: 3,
      title: 'Adidas Sport',
      price: 192,
      description: 'Perfect for training sessions.',
      imageUrl: '/images/adidas3.png',
      colors: ['black', 'gray'], 
      sizes: ['43', '44'], 
  },
  {
      id: 4,
      title: 'Adidas Modern',
      price: 162,
      description: 'Classic design with a modern touch.',
      imageUrl: '/images/adidas4.png',
      colors: ['black', 'white'], 
      sizes: ['45', '46'], 
  },
  {
      id: 5,
      title: 'Jog',
      price: 142,
      description: 'Lightweight t-shirt for all activities.',
      imageUrl: '/images/Jog.png',
      colors: ['black', 'blue'], 
      sizes: ['43', '44', '45'],
  },
  {
      id: 6,
      title: 'Jog Air',
      price: 153,
      description: 'Waterproof jacket for outdoor adventures.',
      imageUrl: '/images/Jog2.png',
      colors: ['red', 'green'], 
      sizes: ['45'], 
  },
  {
      id: 7,
      title: 'Nike Every',
      price: 232,
      description: 'Classic canvas shoes for everyday wear.',
      imageUrl: '/images/nike2.png',
      colors: ['black', 'white'], 
      sizes: ['43', '44'], 
  },
  {
      id: 8,
      title: 'Nike Black',
      price: 193,
      description: 'Premium running shoes for long distances.',
      imageUrl: '/images/nike3.png',
      colors: ['black', 'blue'], 
      sizes: ['45', '46'], 
  },
  {
      id: 9,
      title: 'Jog Sneakers',
      price: 193,
      description: 'Comfortable and stylish sneakers.',
      imageUrl: '/images/Jog3.png',
      colors: ['black', 'green'], 
      sizes: ['43', '44'],
  },
  {
      id: 10,
      title: 'Jog Harmly',
      price: 182,
      description: 'Warm hoodie for cold weather.',
      imageUrl: '/images/Jog4.png',
      colors: ['gray', 'blue'], 
      sizes: ['44', '45'],
  },
];

app.post('/users/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Всі поля повинні бути заповнені!' });
  }

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Користувача з таким email не знайдено!' });
  }

  console.log(`Користувач з email: ${email} намагається увійти`);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Невірний пароль!' });
  }

  const token = jwt.sign(
    { userId: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log(`Токен для користувача ${email}: ${token}`);

  res.json({
    message: 'Вітаємо, ви успішно увійшли!',
    token,
    user: {
      username: user.username,
      email: user.email
    }
  });
});

app.post('/users/signup', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Всі поля повинні бути заповнені!' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Користувач з таким email вже існує!' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPassword, email };
  users.push(newUser);

  res.status(201).json({
    message: 'Користувача успішно зареєстровано!',
    user: { username, email },
  });
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Токен не знайдений' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Невірний токен' });
    }
    req.user = user;
    next();
  });
};

app.post('/users/logout', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/api/products', (req, res) => {
  const { search, sort, color, size } = req.query;

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  if (color) {
    filteredProducts = filteredProducts.filter(product =>
      product.colors.some(c => c.toLowerCase() === color.toLowerCase())
    );
  }

  if (size) {
    filteredProducts = filteredProducts.filter(product =>
      product.sizes.includes(size)
    );
  }

  if (sort === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  res.json(filteredProducts);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: 'Продукт не знайдено' });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/users/me', authenticateToken, (req, res) => {
  const userEmail = req.user.userId; 
  const user = users.find(u => u.email === userEmail);

  if (!user) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  res.json({
    username: user.username,
    email: user.email,
  });
});
