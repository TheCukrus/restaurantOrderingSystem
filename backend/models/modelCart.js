const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    cartItems: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            subtotal: { type: Number, required: true }
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    orderDate: { type: Date, default: Date.now() }
})

cartSchema.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const modelCart = mongoose.model("cart", cartSchema, "cart")

module.exports = modelCart