import React, { useState } from 'react';
import "./OrderTracking.css"

const OrderTracking = () => {
    // Sample data for order tracking (you can replace this with data from your application state or backend)
    const orderHistory = [
      { id: '12345', status: 'Order Received' },
      { id: '54321', status: 'Preparing' },
      { id: '67890', status: 'Out for Delivery' },
      // Add more order entries for testing
    ];
  
    // State for user input
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState(null);
  
    // Function to handle order tracking
    const trackOrder = (e) => {
      e.preventDefault();
      // Find the order with the provided order ID
      const trackedOrder = orderHistory.find(order => order.id === orderId);
      // Update the order status
      setOrderStatus(trackedOrder?.status || 'Order not found');
    };
  
    return (
      <div className="order-tracking">
        <h2>Order Tracking</h2>
        <form onSubmit={trackOrder}>
          <label htmlFor="order-id">Enter Order ID:</label>
          <input
            type="text"
            id="order-id"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button type="submit">Track Order</button>
        </form>
  
        {/* Display order status */}
        {orderStatus && (
          <div className="order-status">
            <h3>Order Status: {orderStatus}</h3>
            {/* Add your timeline-based view here */}
            {/* Example: */}
            <ul>
              <li>Order Received</li>
              <li>Preparing</li>
              <li>Out for Delivery</li>
              <li>Delivered</li>
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default OrderTracking;
  