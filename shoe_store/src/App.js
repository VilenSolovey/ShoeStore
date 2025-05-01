import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import About from './components/home/about/about';
import Reviews from './components/home/reviews/reviews';
import Shoes from './components/home/shoes/shoes';
import Footer from './components/footer/footer';
import Catalog from './components/catalog/Сatalogpage';
import ItemPage from './components/catalog/itemPage/ItemPage';
import { ItemsProvider } from './context/itemscontext';
import Cart from './components/cart/cartPage';
import LoginPage from './components/login/login';
import RegisterPage from './components/login/register';
import { PrivateRoute } from './route/private';
import Form from './components/modal/form'
import Success from './components/modal/success'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ItemsProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute component={<><Header isAuthenticated={isAuthenticated} logout={logout} /><About /><Shoes /><Reviews /><Footer /></>} />
            } 
          />
          <Route 
            path="/services" 
            element={<PrivateRoute component={<><Header isAuthenticated={isAuthenticated} logout={logout} /><Catalog /><Footer /></>} />} 
          />
          <Route 
            path="/item/:id" 
            element={<PrivateRoute component={<><Header isAuthenticated={isAuthenticated} logout={logout} /><ItemPage /><Footer /></>} />} 
          />
          <Route 
            path="/cart" 
            element={<PrivateRoute component={<><Header isAuthenticated={isAuthenticated} logout={logout} /><Cart /><Footer /></>} />} 
          />
          <Route 
            path="/checkout" 
            element={<PrivateRoute component={<><Header isAuthenticated={isAuthenticated} logout={logout} /><Form /><Footer /></>} />} 
          />
          <Route 
            path="/success" 
            element={<PrivateRoute component={<><Header isAuthenticated={isAuthenticated} logout={logout} /><Success /><Footer /></>} />} 
          />
        </Routes>
      </Router>
    </ItemsProvider>
  );
}

export default App;