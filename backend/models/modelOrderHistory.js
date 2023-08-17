const mongoose = require("mongoose")

const orderHistorySchema = new mongoose.Schema({
    "userId": { type: String, required: true },
    "orderHistory": [{
        items: { type: Array },
        status: { type: String },
        date: { type: Date, default: Date.now() }
    }],
})

orderHistorySchema.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const modelOrderHistory = mongoose.model("orderHistory", orderHistorySchema, "orderHistory")

module.exports = modelOrderHistory