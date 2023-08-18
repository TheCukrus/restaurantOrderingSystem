import { useState } from "react"
import OrderHistory from "./OrderHistory.jsx"
import "./OrderTracking.css"
import { useUserContext } from "../../contexts/UserContext.js"
import orderService from "../../services/orderHistory.js"

const OrderTracking = () =>
{
  const { user } = useUserContext()

  // State for user input
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  // Function to handle order tracking
  const trackOrder = async (e) =>
  {
    e.preventDefault()
    try
    {
      if (!orderId)
      {
        return
      }

      const data = await orderService.getOrder(orderId)
      if (!data)
      {
        return setOrderStatus("Order not Found")
      }
      return setOrderStatus(data.data.status)
    }
    catch (err)
    {
      console.log(err)
    }
  }

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
        </div>
      )}

      {user && <h2>Order History</h2>}
      <OrderHistory />
    </div >
  );
};

export default OrderTracking;
