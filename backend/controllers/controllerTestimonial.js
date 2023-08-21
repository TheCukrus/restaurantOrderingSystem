const express = require("express")
const modelTestimonial = require("../models/modelTestimonial.js")
const logger = require("../utils/logger.js")

const controllerTestimonial = express.Router()

//Get all testimonials
controllerTestimonial.get("/", async (req, res) =>
{
    try
    {
        const testimonials = await modelTestimonial.find({})
        res.status(200).json({ message: testimonials })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

controllerTestimonial.post("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Not authorized" })
        }

        if (!req.body.content && !req.body.name)
        {
            return res.status(400).json({ message: "Content and name fields must not be empty" })
        }

        const testimonial = {
            name: req.body.name,
            content: req.body.content
        }
        await modelTestimonial.create(testimonial)
        res.status(201).json({ message: "Testimonial created" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controllerTestimonial