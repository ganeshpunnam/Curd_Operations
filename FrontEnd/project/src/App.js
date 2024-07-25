import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css';

import Signin from './Components/MainHomePage';
import Home from './Components/Home';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/MainHomePage" element={<Signin />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginPage" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
