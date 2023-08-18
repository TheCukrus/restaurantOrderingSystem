import { useState, useEffect } from "react"
import ordersService from "../../services/orderHistory.js"
import { Table } from "react-bootstrap"
import { useUserContext } from "../../contexts/UserContext"

const OrderHistory = () =>
{

    const { user } = useUserContext()

    const [orders, setOrders] = useState(null)

    const fetchOrders = async () =>
    {
        try
        {
            const data = await ordersService.getOrderHistory()
            // console.log(data)
            return setOrders(data.data?.orderHistory)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() =>
    {
        if (!user)
        {
            return
        }
        fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {user && (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{new Date(order.date).toLocaleString()}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {order.items.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                {Array.isArray(item) ? (
                                                    item.map((subItem, subItemIndex) => (
                                                        <div key={subItemIndex}>
                                                            {subItem.title}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>
                                                        {item.title}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {order.items.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                {Array.isArray(item) ? (
                                                    item.map((subItem, subItemIndex) => (
                                                        <div key={subItemIndex}>
                                                            {subItem.quantity}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>
                                                        {item.quantity}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

        </div>
    )
}

export default OrderHistory