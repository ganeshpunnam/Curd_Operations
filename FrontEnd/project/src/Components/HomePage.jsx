import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import './HomePage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const Navigate =useNavigate()
  return (
    <div onClick={()=>Navigate('/LoginPage')} className="homepage">
      <Header className="header"/>
      <Body className="body"/>
      <Footer className="footer"/>
      {/* <Home/> */}
    </div>
  );
}

export default HomePage;
