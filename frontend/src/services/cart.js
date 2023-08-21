import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/cart"
}
else
{
    baseUrl = "https://restaurantordersystem.onrender.com/api/cart"
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

const getCart = async () =>
{

    try
    {
        const cartData = await axios.get(baseUrl, config)
        return cartData.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const getCartDishes = async (data) =>
{
    try
    {
        const details = await axios.post(`${baseUrl}/details`, data, config)
        return details.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const updateCart = async (data) =>
{
    try
    {
        const createCart = await axios.post(baseUrl, data, config)
        return createCart
    }
    catch (err)
    {
        console.log(err)
    }
}

const updateCartItemQuantity = async (itemId, newQuantity) =>
{
    try
    {
        const response = await axios.put(`${baseUrl}/${itemId}`, { quantity: newQuantity }, config)
        return response.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const removeCartItem = async (itemId) =>
{
    try
    {
        const response = await axios.delete(`${baseUrl}/${itemId}`, config)
        return response.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const removeAll = async () =>
{
    try
    {
        const response = await axios.delete(baseUrl, config)
        return response.data
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { updateCart, getCart, getCartDishes, setAuthorizationToken, updateCartItemQuantity, removeCartItem, removeAll }