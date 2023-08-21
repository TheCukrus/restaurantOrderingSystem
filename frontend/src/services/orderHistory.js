import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/orderHistory"
}
else
{
    baseUrl = "https://restaurantordersystem.onrender.com/api/orderHistory"
}

const getToken = () =>
{
    const tokenFromStorage = window.localStorage.getItem("token")
    return tokenFromStorage ? `Bearer ${JSON.parse(tokenFromStorage).token}` : null
}

const setAuthorizationToken = (token) =>
{
    config.headers.authorization = token
}

const config = {
    headers: {
        "authorization": getToken()
    }
}

const getOrderHistory = async () =>
{

    try
    {
        const orderHistory = await axios.get(baseUrl, config)
        return orderHistory.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const getOrder = async (id) =>
{
    try
    {
        const order = await axios.get(`${baseUrl}/${id}`)
        return order.data
    }
    catch (err)
    {
        console.log(err)
        return err?.response?.data?.error
    }
}

const updateOrder = async (data) =>
{
    try
    {
        const addOrder = await axios.put(baseUrl, data, config)
        return addOrder.data
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getOrderHistory, getOrder, setAuthorizationToken, updateOrder }