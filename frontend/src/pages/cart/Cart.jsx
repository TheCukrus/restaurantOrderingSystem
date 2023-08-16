import React from 'react'
import "./Cart.css"
import { useCartContext } from '../../contexts/CartContext'
import { Link } from "react-router-dom"

const Cart = () =>
{

  const { cartItems, removeFromCart, changeQuantity, clearCart, cartTotal } = useCartContext()

  return (

    <div className="cart">
      <h6>Shopping Cart</h6>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img className="cartImage" src={item.imagePath} alt={item.title} />
              <div>
                <h3><b>{item.title}</b></h3>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))}
                />
              </div>
              <div>
                <p>SubTotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button className="removeBtn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cartTotal">
            <p>Total: ${cartTotal.toFixed(2)}</p>
            <div>
              <button className="removeBtn" onClick={clearCart}>Clear Cart</button>
              <Link to="/checkout" className="checkout-link">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
