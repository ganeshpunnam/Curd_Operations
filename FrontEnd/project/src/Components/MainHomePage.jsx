import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import './HomePage.css'; // Import the CSS file
import Home from './Home'

const Signin = () => {
  return (
    <div  className="homepage">
    <Header className="header"/>
    <Body className="body"/>
    <Footer className="footer"/>
    <Home/>
  </div>
  );
};

export default Signin;
