import { createContext, useContext, useState, useEffect, useRef } from "react"
import cartService from "../services/cart.js"
import { useUserContext } from "./UserContext.js"
import { useNotificationContext } from "./NotificationContext.js"

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
    const { user } = useUserContext()
    const { addNotification } = useNotificationContext()

    const userRef = useRef(user)

    const [cartItems, setCartItems] = useState([])

    //Fetch cart if this exists
    const fetchCart = async () =>
    {
        try
        {
            //Check if the user is authenticated
            if (!user)
            {
                return
            }

            //Fetch cart data
            const cart = await cartService.getCart()

            // console.log(cart)
            if (!cart.cartData)
            {
                return
            }

            //Creating array of dish id's
            const arr = cart.cartData.cartItems.map((ele) => (
                {
                    ids: ele.itemId,
                    quantity: ele.quantity
                }
            ))

            //By id's fetching all dishes
            const detailedDishes = await cartService.getCartDishes(arr)

            //Adding quantity to dishes
            const updatedDishes = detailedDishes.dishes.map((ele) => 
            {
                const cartItem = cart.cartData.cartItems.find(
                    (item) => item.itemId === ele.id
                )

                if (cartItem)
                {
                    return { ...ele, quantity: cartItem.quantity }
                }
                else
                {
                    return ele
                }
            })

            // console.log(updatedDishes)
            return setCartItems(updatedDishes)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() =>
    {
        const currentUser = userRef.current

        if (currentUser !== user)
        {
            fetchCart()
            userRef.current = user
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    //Add item to the cart
    const addToCart = async (item) =>
    {
        try
        {
            //Checking if this item is in cart
            const existingItem = cartItems.find(cartItem => cartItem.id === item.id)

            let updateCartItems

            if (existingItem)
            {
                //Update the quantity if the item is already in the cart
                updateCartItems = cartItems.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            }
            else
            {
                //Add a new item to the cart
                updateCartItems = [...cartItems, { ...item, quantity: 1 }]
            }

            const cartToDb = updateCartItems.map((ele) => (
                {
                    itemId: ele.id,
                    itemName: ele.title,
                    quantity: ele.quantity,
                    price: ele.price,
                    subtotal: Number((ele.price * ele.quantity).toFixed(2))
                }
            )
            )

            //Update the cart on the server
            await cartService.updateCart({ username: JSON.parse(user).username, cartItems: cartToDb })

            //Update the state after the API call
            setCartItems(updateCartItems)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const removeFromCart = async (itemId) =>
    {
        try
        {
            //Remove the item from the server
            await cartService.removeCartItem(itemId)

            //Update the local cart state
            setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== itemId))
            addNotification(`Remove item from cart`, "success")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const changeQuantity = async (itemId, newQuantity) =>
    {
        try
        {
            if (newQuantity >= 0)
            {
                setCartItems(prevCartItems => prevCartItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                ))
            }

            //Update the quantity on the server
            await cartService.updateCartItemQuantity(itemId, newQuantity)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const clearCart = async () =>
    {
        try
        {
            await cartService.removeAll()

            //Update cart
            setCartItems([])

            setCartItems((prevCartItems) => [])
            addNotification("Cart removed", "success")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, changeQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}
