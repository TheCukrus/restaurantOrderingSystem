const express = require("express")
const modelContact = require("../models/modelContact.js")
const logger = require("../utils/logger.js")

const controllerContact = express.Router()

//GET get all messages
controllerContact.get("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            res.status(401).json({ message: "Not authorized" })
        }

        const data = await modelContact.find({})
        res.status(200).json({ messages: data })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST create message
controllerContact.post("/", async (req, res) =>
{
    try
    {
        const { name, email, message } = req.body

        if (!name || !email || !message)
        {
            return res.status(400).json({ message: "Please enter all fields" })
        }

        await modelContact.create({ name, email, message })
        res.status(201).json({ message: "Message send successfull!" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//PUT make message readed
controllerContact.put("/:id", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            res.status(401).json({ message: "Not authorized" })
        }

        //Find message by Id
        const message = await modelContact.findById(req.params.id)

        if (!message)
        {
            res.status(404).json({ message: "Message not found" })
        }

        //Toggle the readed fields to it's opposite value
        message.readed = !message.readed

        await message.save()

        res.status(200).json({ message: "Message read status updated successfully" })

    }
    catch (err)
    {
        logger.error()
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controllerContact