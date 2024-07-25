import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3500';

const Home = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const handleAddUser = async () => {
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




  const handleUpdateUser = async (id) => {
    const newUsername = prompt('Enter new username');
    if (newUsername) {
      try {
        const response = await axios.put(`${API_URL}/update/${id}`, { Username: newUsername });
        if (response.data) {
          const updatedData = await axios.get(`${API_URL}/`);
          setData(updatedData.data);
        }
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Error updating user');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      const updatedData = await axios.get(`${API_URL}/`);
      setData(updatedData.data);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/LoginPage', { state: { data } }); // Pass data through the state
  };
  console.log('Data to pass:', data);


  return (
    <div className="App">
      <h1>User Data</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
 
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
      />
       
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleAddUser}>Add User</button>
      <button onClick={handleLoginRedirect}>Go to Login</button> {/* Button to navigate to Login */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Age</th>
            <th>Password</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((user) => (
            <tr key={user._id}>
              <td>{user.Username}</td>
              <td>{user.Age}</td>
              <td>{user.Password}</td>
              <td>
                <button onClick={() => handleUpdateUser(user._id)}>Update</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
