import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const API_URL = 'http://localhost:3500';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`${API_URL}/`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Expected array but got:', response.data);
          toast.error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    }
    loadData();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setInputPassword(event.target.value);
  };

  const loginCheck = (event) => {
    event.preventDefault();
   

    if ( data.some(user => user.Username === inputValue && user.Password === inputPassword)) {
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/MainHomePage');
      }, 2000);
    } 
    else if( inputValue === "Ganesh@gmail.com" && inputPassword === "Ganesh@gmail.com"){
      toast.success('Login Admin successful! Redirecting...');
      navigate('/Admin')
    }
    else {
      toast.error('Incorrect details');
    }
  };

  return (
    <div className='login-maincontainer'>
      <button onClick={() => navigate('/')} className='backButton'>Back</button>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={loginCheck}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                id="email" 
                value={inputValue} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={inputPassword} 
                onChange={handlePasswordChange} 
                required 
              />
            </div>
            <button type="submit" className="btn">Login</button>
          </form>
          <div className="signup-link">
            Don't have an account? <Link to='/SignupPage'>Sign Up</Link>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add the ToastContainer component */}
    </div>
  );
}

export default Login;
