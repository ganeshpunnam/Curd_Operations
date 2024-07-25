import React, { useState,useEffect } from 'react';
import './SignupPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:3500';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  const [data, setData] = useState([]);


  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`${API_URL}/`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Expected array but got:', response.data);
          alert('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
      }
    }
    loadData();
  }, []);
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!username.trim() || !age.trim() || !password.trim()) {
        alert('All fields are required.');
        return;
    }

    try {
        const response = await axios.post(`${API_URL}/adduser`, { 
            Username: username, 
            Age: age, 
            Password: password 
        });

        if (Array.isArray(response.data)) {
            setData(response.data);
            alert("uesf");
            navigate('/LoginPage')

        } else {
            console.error('Expected array but got:', response.data);
            alert('Unexpected data format');
        }

        setUsername('');
        setAge(''); // Reset age field
        setPassword(''); // Reset password field
    } catch (error) {
        console.error('Error adding user:', error);
        alert('Error adding user');
    }
};


  return (
    <div className='signupPage-container'>
    <button onClick={()=>navigate('/')} className='backButton' >Back</button>

    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            {/* <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            /> */}
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              id="age" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input 
              type="date" 
              id="dob" 
            //   value={dob} 
            //   onChange={(e) => setDob(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn">Signup</button>
        </form>
        <div className="login-link">
          Already have an account? <a href="#">Login</a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;