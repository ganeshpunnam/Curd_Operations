import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3500'; // Replace with your Express backend URL

function App() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');

    // Fetch data on component mount
    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.get(`${API_URL}/`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching data');
            }
        }
        loadData();
    }, []);

    // Add new user
    const handleAddUser = async () => {
        if (!username.trim()) {
            alert('Username cannot be empty');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/adduser`, { Username: username });
            setData(response.data);
            setUsername('');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user');
        }
    };

    // Update user
    const handleUpdateUser = async (id) => {
        const newUsername = prompt('Enter new username');
        if (newUsername) {
            try {
                const response = await axios.put(`${API_URL}/update/${id}`, { Username: newUsername });
                setData(response.data);
            } catch (error) {
                console.error('Error updating user:', error);
                alert('Error updating user');
            }
        }
    };

    // Delete user
    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    return (
        <div className="App">
            <h1>User Data</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button onClick={handleAddUser}>Add User</button>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user._id}>
                            <td>{user.Username}</td>
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
}

export default App;
