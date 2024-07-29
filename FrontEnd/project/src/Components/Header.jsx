import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faCogs, faEnvelope, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link ,useNavigate} from 'react-router-dom';
import Cart from './Cart';

const Header = () => {
    const Navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>MyWebsite</h1>
        </div>
        <nav>
          <ul>
            <li><a href="#"><FontAwesomeIcon icon={faHome} /> Home</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faInfoCircle} /> About</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faCogs} /> Services</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faEnvelope} /> Contact</a></li>
          </ul>
        </nav>
        <div className="auth-links">
        <Link to={'/cart'} className="auth-link2"> Cart</Link>
        <Link to={'/LoginPage'} className="auth-link"><FontAwesomeIcon icon={faSignInAlt} /> LogOut</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
