const express = require("express")
const mongoose = require("mongoose")
const logger = require("./utils/logger.js")
const config = require("./utils/config.js")
const cors = require("cors")
const middleware = require("./utils/middleware.js")
const controllerUser = require("./controllers/controllerUser.js")
const controllerLogin = require("./controllers/controllerLogin.js")
const controllerMenu = require("./controllers/controllerMeniu.js")

const app = express()

mongoose.connect(config.MONGODB)
    .then(() => logger.info("Connect to mongoDB"))
    .catch((error) => logger.error("Error connecting to mongoDB", error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use("/api/users", controllerUser)
app.use("/api/login", middleware.tokenExtractor, controllerLogin)
app.use("/api/menu", controllerMenu)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

//login admin
//email email@gmail.com
//password assddffgg