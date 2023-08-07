const express = require("express")
const modelUser = require("../models/modelUser.js")
const logger = require("../utils/logger.js")
const bcrypt = require("bcryptjs")

const controllerUser = express.Router()

controllerUser.get("/", async (req, res) =>
{
    try
    {
        const users = await modelUser.find({})

        res.status(200).json(users)
    }
    catch (err)
    {
        logger.error(err)
    }
})

controllerUser.post("/", async (req, res) =>
{
    try
    {
        const { name, username, email, password } = req.body

        if (!username)
        {
            return res.status(400).json({ message: "Username field is empty" })
        }

        if (!email)
        {
            return res.status(400).json({ message: "Email field is empty" })
        }

        if (!password)
        {
            return res.status(400).json({ message: "Password field is empty" })
        }

        if (username.length < 3)
        {
            return res.status(400).json({ message: "Username must contain at least 3 characters" })
        }

        if (password.length < 8)
        {
            return res.status(400).json({ message: "Password must contain at least 8 characters" })
        }

        const setRounds = 10
        const passwordHash = await bcrypt.hash(password, setRounds)

        const usernameChecker = await modelUser.find({ username })

        if (usernameChecker.length !== 0)
        {
            return res.status(400).json({ message: "Username is taken" })
        }

        const emailChecker = await modelUser.find({ email })

        if (emailChecker.length !== 0)
        {
            return res.status(400).json({ message: "Email is taken" })
        }

        await modelUser.create({
            "username": username,
            "email": email,
            "name": name,
            "password": passwordHash
        })

        res.status(201).json({ message: "User created" })

    }
    catch (err)
    {
        logger.error(err)
    }
})

module.exports = controllerUser