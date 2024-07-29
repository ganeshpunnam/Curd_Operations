import React, { useEffect, useState, useContext } from 'react';
import './Body.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const API_URL = 'http://localhost:3500';

const Body = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/product`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
   alert("Product added to cart ....")
  };

  return (
    <div className="body">
      <h1>Welcome to MyWebsite</h1>
      {error && <p>Error: {error.message}</p>}
      <section className="hero">
        {data.map((newData) => (
          newData && (
            <div key={newData._id} className="product-card">
              <h2>{newData.Productname}</h2>
              <img src={newData.ProductImg} alt={newData.Productname} />
              <p>Price: ${newData.ProductRate}</p>
              <p>Description: {newData.ProductDSC}</p>
              <button onClick={() => handleAddToCart(newData)}>Add to Cart</button>
            </div>
          )
        ))}
      </section>
    </div>
  );
};

export default Body;
