import React from 'react';
import './Cart.css';

const Cart = ({ cart, updateCartQuantity }) => {
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((product, index) => (
            <li key={index} className="cart-item">
              <img src={product.imgurl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>Price: ₹{product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateCartQuantity(product.productId, -1)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => updateCartQuantity(product.productId, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;