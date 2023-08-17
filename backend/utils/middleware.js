const logger = require("./logger.js")
const jwt = require("jsonwebtoken")
const config = require("./config.js")
const modelUser = require("../models/modelUser.js")

const unknownEndpoint = (req, res) =>
{
    res.status(404).send({ error: "Unknown endpoint" })
}

const errorHandler = (err, req, res, next) =>
{
    logger.error(err.message)

    if (err.name === "CastError")
    {
        return res.status(400).send({ error: "malformatted id" })
    }
    else if (err.name === "ValidationError")
    {
        res.status(400).json({ error: err.message })
    }
    else if (err.name === "JsonWebTokenError")
    {
        return res.status(401).json({ error: "Invalid token" })
    }
    else if (err.name === "TokenExpiredError")
    {
        return res.status(401).json({ error: "Token expired" })
    }

    next(err)
}

const tokenExtractor = (req, res, next) =>
{
    let authorization = req.get("authorization")
    if (authorization && authorization.startsWith("Bearer "))
    {
        authorization = authorization.replace("Bearer ", "")
        const decodedToken = jwt.verify(authorization, config.JWT_SECRET)
        req.token = decodedToken
    }
    else
    {
        authorization = null
    }
    next()
}

const userExtractor = async (req, res, next) =>
{
    try
    {
        const user = await modelUser.findById(req.token?.id)
        req.user = user
    }
    catch (err)
    {
        logger.error(err)
    }
    finally
    {
        next()
    }
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }