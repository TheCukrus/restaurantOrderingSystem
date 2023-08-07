const express = require("express")
const modelMenu = require("../models/modelMenu.js")
const logger = require("../utils/logger.js")
const modelUser = require("../models/modelUser.js")

const controllerMenu = express.Router()

controllerMenu.get("/", async (req, res) =>
{
    try
    {
        const getMenu = await modelMenu.find({})
        res.status(200).json({ menu: getMenu })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

controllerMenu.post("/", async (req, res) =>
{
    try
    {

        if (!req.token.id)
        {
            return res.status(401).json({ message: "Token invalid" })
        }

        const { title, category, description, price, imagePath } = req.body

        const role = await modelUser.findById(req.token.id)

        if (role.role !== "admin")
        {
            return res.status(401).json({ message: "You have no access" })
        }

        if (!title)
        {
            return res.status(400).json({ message: "Title input field is empty" })
        }

        if (!category)
        {
            return res.status(400).json({ message: "Category input field is empty" })
        }

        const data = { title, category, description, price, imagePath }

        await modelMenu.create(data)

        res.status(201).json({ message: `New dish ${title} added` })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controllerMenu