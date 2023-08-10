const express = require("express")
const modelCart = require("../models/modelCart.js")
const modelUser = require("../models/modelUser.js")
const modelMenu = require("../models/modelMenu.js")
const logger = require("../utils/logger.js")

const controllerCart = express.Router()

controllerCart.get("/", async (req, res) =>
{
    try
    {
        if (!req.token.id)
        {
            return res.status(401).json({ message: "Token invalid" })
        }

        const cartData = await modelCart.findOne({ userId: req.token.id })
        res.status(200).json({ cartData })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

controllerCart.post("/details", async (req, res) =>
{
    try
    {
        if (!req.token.id)
        {
            return res.status(401).json({ message: "Token invalid" })
        }

        const dishIDs = req.body

        const detailedDishes = await Promise.all(
            dishIDs.map(async (dishId) =>
            {
                const dish = await modelMenu.findById(dishId)
                return dish
            })
        )

        res.status(200).json({ dishes: detailedDishes })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

controllerCart.post("/", async (req, res) =>
{
    try
    {
        const { username, cartItems } = req.body

        //GET user ID
        const userId = await modelUser.findOne({ username })

        //Check if cart already exists
        let cart = await modelCart.findOne({ userId: userId.id })

        //Count total price of dishes
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

        if (cart)
        {
            //Update the existing cart
            cart.cartItems.push(...cartItems)
            cart.totalPrice = totalPrice
            await cart.save()
        }
        else
        {
            const newCart = await modelCart.create({
                userId: userId.id,
                cartItems: cartItems,
                totalPrice: totalPrice,
                status: "Order received"
            })
        }

        res.status(201).json({ message: "Cart created or updated" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controllerCart