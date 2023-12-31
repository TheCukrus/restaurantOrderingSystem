const express = require("express")
const mongoose = require("mongoose")
const logger = require("./utils/logger.js")
const config = require("./utils/config.js")
const cors = require("cors")
const middleware = require("./utils/middleware.js")
const controllerUser = require("./controllers/controllerUser.js")
const controllerLogin = require("./controllers/controllerLogin.js")
const controllerMenu = require("./controllers/controllerMeniu.js")
const controllerAdmin = require("./controllers/controllerAdmin.js")
const controllerCart = require("./controllers/controllerCart.js")
const controllerOrderHistory = require("./controllers/controllerOrderHistory.js")
const controllerTestimonial = require("./controllers/controllerTestimonial.js")
const controllerContact = require("./controllers/controllerContact.js")
const path = require("path")

const app = express()

const frontendBuildPath = path.resolve(__dirname, "..", "frontend", "build")

mongoose.connect(config.MONGODB)
    .then(() => logger.info("Connect to mongoDB"))
    .catch((error) => logger.error("Error connecting to mongoDB", error.message))

app.use(cors())
app.use(express.json())
app.use(express.static(frontendBuildPath))
app.use(middleware.tokenExtractor)

app.use("/api/users", controllerUser)
app.use("/api/login", middleware.tokenExtractor, controllerLogin)
app.use("/api/menu", middleware.tokenExtractor, controllerMenu)
app.use("/api/admin", middleware.tokenExtractor, controllerAdmin)
app.use("/api/cart", middleware.tokenExtractor, controllerCart)
app.use("/api/orderHistory", middleware.tokenExtractor, controllerOrderHistory)
app.use("/api/testimonial", middleware.tokenExtractor, controllerTestimonial)
app.use("/api/contact", middleware.tokenExtractor, controllerContact)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

//login admin
//email email@gmail.com
//password assddffgg