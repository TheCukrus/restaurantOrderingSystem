const express = require("express")
const logger = require("../utils/logger.js")
const modelUser = require("../models/modelUser.js")

const controllerAdmin = express.Router()

controllerAdmin.get("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Not authorized" })
        }

        const userRole = await modelUser.findById(req.token.id)

        if (userRole.role !== "admin")
        {
            return logger.info({ message: "Have no access" })
        }


        res.status(200).json({ message: "Access granted" })
    }
    catch (err)
    {
        logger.error(err)
    }
})

module.exports = controllerAdmin