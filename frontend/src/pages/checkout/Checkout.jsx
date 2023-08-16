import React from 'react';
import { useCartContext } from '../../contexts/CartContext';
import './Checkout.css';
import orderService from "../../services/orderHistory.js"
import { useNotificationContext } from '../../contexts/NotificationContext';
import { useNavigate } from "react-router-dom"

const Checkout = () =>
{
    const { cartItems, cartTotal, clearCart } = useCartContext();
    const { addNotification } = useNotificationContext()

    const homeNav = useNavigate()

    const handleCheckout = async () =>
    {
        try
        {
            await orderService.updateOrder({ order: cartItems })
            homeNav("/")
            clearCart()
            return addNotification("Order places successfull", "success")
            //Add in future
            //Sendng via email order information and irder Id
        }
        catch (err)
        {
            console.log(err)
        }
        if (cartItems.length === 0)
        {
            return
        }
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-heading">Checkout</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty. Add items to your cart before checking out.</p>
            ) : (
                <div className="checkout-summary">
                    <ul className="checkout-items">
                        {cartItems.map(item => (
                            <li key={item.id} className="checkout-item">
                                <span className="item-title">{item.title}</span>
                                <span className="item-quantity">x {item.quantity}</span>
                                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="checkout-total">
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                        <p>Total: <span className="total-amount">${cartTotal.toFixed(2)}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
