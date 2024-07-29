import React, { useEffect, useState } from 'react';
import './Body.css';
import axios from 'axios';

const API_URL = 'http://localhost:3500';

const Body = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [productname, SetProductname] = useState('');
  const [productRate, SetProductRate] = useState('');
  const [productImg, SetProductImg] = useState('');
  const [productDsc, SetProductDsc] = useState('');
  const [loading, setLoading] = useState(false);

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

  const deleteHandle = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/ProductDelete/${id}`);
      setData(prevData => prevData.filter(product => product._id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      alert('Error deleting product');
    }
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!productname.trim() || !productRate.trim() || !productImg.trim() || !productDsc.trim()) {
      alert('All fields are required.');
      return;
    }

    setLoading(true); // Indicate loading state
    try {
      const response = await axios.post(`${API_URL}/addproduct`, { 
        Productname: productname, 
        ProductRate: productRate, 
        ProductImg: productImg,
        ProductDSC: productDsc // Ensure this matches server-side field name
      });

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('Expected array but got:', response.data);
        alert('Unexpected data format');
      }
       
      SetProductname('');
      SetProductRate('');
      SetProductImg('');
      SetProductDsc('');
      alert('Product added')
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
      alert('Error adding product');
    }
    setLoading(false); 
  };

  return (
    <div className="body">
      <h1>Welcome to MyWebsite</h1>
      <div >
        <h1>Add Product</h1>
        <div className="mainbox">
        <input
          type="text"
          value={productname}
          onChange={(e) => SetProductname(e.target.value)}
          placeholder="Enter product name"
        />
        <input
          type="text"
          value={productRate}
          onChange={(e) => SetProductRate(e.target.value)}
          placeholder="Enter product rate"
        />
        <input
          type="text"
          value={productImg}
          onChange={(e) => SetProductImg(e.target.value)}
          placeholder="Enter product image URL"
        />
        <input
          type="text"
          value={productDsc}
          onChange={(e) => SetProductDsc(e.target.value)}
          placeholder="Enter product description"
        />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>

      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <section className="hero">
        {data.map((newData) => (
          newData && (
            <div key={newData._id} className="product-card">
              <h2>{newData.Productname}</h2>
              <img src={newData.ProductImg} alt={newData.Productname} />
              <p>Price: ${newData.ProductRate}</p>
              <p>Description: {newData.ProductDSC}</p>
              <button onClick={() => deleteHandle(newData._id)}>Delete</button>
            </div>
          )
        ))}
      </section>
    </div>
  );
};

export default Body;
