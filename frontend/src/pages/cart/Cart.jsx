import React, { useState } from 'react'
import "./Cart.css" 

const Cart = () => {
    // Sample data for cart items (you can replace this with data from your application state)
    const cartItems = [
      { id: 1, name: 'Delicious Pizza', quantity: 2, price: 10.99 },
      { id: 2, name: 'Savory Pasta', quantity: 1, price: 12.99 },
      { id: 3, name: 'Savory ', quantity: 1, price: 12.99 },
      { id: 4, name: 'Savory Pasta', quantity: 1, price: 12.99 },
      { id: 5, name: 'Savory Pasta', quantity: 1, price: 12.99 },

      // Add more cart items for testing
    ];
  
    // Calculate the total order amount
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
    // State to keep track of the cart items
    const [cart, setCart] = useState(cartItems);
  
    // Function to update the quantity of a cart item
    const updateQuantity = (itemId, newQuantity) => {
      const updatedCart = cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
    };
  
    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);
    };
  
    return (
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: 
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  />
                </p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ${totalAmount.toFixed(2)}</h3>
              <button>Checkout</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;
  