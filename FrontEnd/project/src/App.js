import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Signin from './Components/MainHomePage';
import Home from './Components/Home';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Admin from './Components/Admin';
import Body from './Components/Body';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/MainHomePage" element={<Signin />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/products" element={<Body />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
