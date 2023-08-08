const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true, minLength: 8 },
    role: { type: String, default: "user" }
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const modelUser = mongoose.model("user", userSchema, "user")

module.exports = modelUser