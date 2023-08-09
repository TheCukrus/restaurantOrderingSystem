import { createContext, useContext, useState } from "react"
import cartService from "../services/cart.js"

//Create context
const CartContext = createContext()

//Create custom hook to use the context
export const useCartContext = () =>
{
    return useContext(CartContext)
}

//Create the provider component
export const CartProvider = ({ children }) =>
{
    const [cartItems, setCartItems] = useState([])

    console.log(cartItems)
    const addToCart = (item) =>
    {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        if (existingItem)
        {
            setCartItems(prevCartItems => prevCartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ))
        }
        else
        {
            setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity: 1 }]);
        }
    }

    const removeFromCart = (itemId) =>
    {
        setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== itemId))
    }

    const changeQuantity = (itemId, newQuantity) =>
    {
        if (newQuantity >= 0)
        {
            setCartItems(prevCartItems => prevCartItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ))
        }
    }

    const clearCart = () =>
    {
        setCartItems([])
    }

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, changeQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}
