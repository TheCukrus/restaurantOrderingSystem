const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    imagePath: { type: String }
})

menuSchema.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const modelMenu = mongoose.model("menu", menuSchema, "menu")

module.exports = modelMenu