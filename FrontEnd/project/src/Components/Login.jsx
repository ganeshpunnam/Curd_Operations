import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data || []; // Access passed data

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const loginCheck = (event) => {
    event.preventDefault();
    const userExists = data.some(user => user.Username === inputValue);

    if (userExists) {
      navigate('/signin');
    } else {
      alert('Incorrect details');
    }
  };

  return (
    <div>
      
      <form onSubmit={loginCheck}>
        <input type='text' value={inputValue} onChange={handleInput} />
        <button type='submit'>Login</button>
      </form>
      {inputValue}
    </div>
  );
}

export default Login;
