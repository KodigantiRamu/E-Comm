import React from 'react';

const Cart = ({ cart }) => {
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <h3>{product.productName}</h3>
              <p>Price: ₹{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;