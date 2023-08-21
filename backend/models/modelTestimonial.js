const mongoose = require("mongoose")

const testimonialSchema = new mongoose.Schema({
    "Date": { type: Date, default: Date.now() },
    "name": { type: String, require: true },
    "content": { type: String, require: true }
})

testimonialSchema.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const modelTestimonial = mongoose.model("testimonial", testimonialSchema, "testimonial")

module.exports = modelTestimonial