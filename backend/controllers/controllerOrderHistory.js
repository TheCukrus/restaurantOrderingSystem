const modelOrderHistory = require("../models/modelOrderHistory.js")
const express = require("express")
const logger = require("../utils/logger.js")

const controllerOrderHistory = express.Router()

//Get order history
controllerOrderHistory.get("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Not authorized" })
        }

        const userId = req.token.id

        const orders = await modelOrderHistory.findOne({ userId })

        res.status(200).json({ data: orders })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//GET order by Id
controllerOrderHistory.get("/:orderId", async (req, res) =>
{
    try
    {
        const orderId = req.params.orderId

        const order = await modelOrderHistory.findOne({ "orderHistory._id": orderId })

        if (!order)
        {
            return res.status(404).json({ message: "Order not found" })
        }

        const matchOrder = order.orderHistory.find(item => item._id.toString() === orderId)

        res.status(200).json({ data: matchOrder })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//PUT add order
controllerOrderHistory.put("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Not authorized" })
        }

        const userId = req.token.id
        const { order } = req.body

        //Find the order history for the user
        let orderHistory = await modelOrderHistory.findOne({ userId })

        if (!orderHistory)
        {
            //If no order history exists, create a new record
            orderHistory = await modelOrderHistory.create({
                "userId": userId,
                "orderHistory": [{
                    "items": order,
                    "status": "Order placed"
                }],
            })
        }
        else
        {
            //Add new item to the existing order history
            orderHistory.orderHistory.push({
                "items": [order],
                "status": "Order placed"
            })
            await orderHistory.save()
        }

        res.status(200).json({ message: "Order added successfully" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controllerOrderHistory