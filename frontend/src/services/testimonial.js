import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/testimonial"
}
else
{
    baseUrl = "https://restaurantordersystem.onrender.com/api/testimonial"
}

const getToken = () =>
{
    const tokenFromStorage = window.localStorage.getItem("token")
    return tokenFromStorage ? `Bearer ${JSON.parse(tokenFromStorage).token}` : null
}

const config = {
    headers: {
        "authorization": getToken()
    }
}

const getTestimonials = async () =>
{
    try
    {
        const testimonial = await axios.get(baseUrl)
        return testimonial.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const createTestimonial = async (data) =>
{
    try
    {
        const newTestimonial = await axios.post(baseUrl, data, config)
        return newTestimonial.data
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getTestimonials, createTestimonial }