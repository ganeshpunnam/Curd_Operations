import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';

function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.ProductImg} alt={item.Productname} width="50" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.Productname}</span>
                <span className="cart-item-price">${item.ProductRate}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
