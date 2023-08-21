import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/menu"
}
else
{
    baseUrl = "https://restaurantordersystem.onrender.com/api/menu"
}


const getToken = () =>
{
    const tokenFromStorage = window.localStorage.getItem("token")
    return tokenFromStorage ? `Bearer ${JSON.parse(tokenFromStorage).token}` : null
}

const config = {
    headers: { "authorization": getToken() }
}

const getAll = async () =>
{
    try
    {
        const data = await axios.get(baseUrl)
        return data.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const createDish = async (data) =>
{
    try
    {
        const newDish = await axios.post(baseUrl, data, config)
        return newDish.data
    }
    catch (err)
    {
        console.log(err)
        return err?.response?.data?.error
    }
}

const updatedDish = async (data) =>
{
    try
    {
        const updatedDish = await axios.put(`${baseUrl}/${data.id}`, data, config)
        return updatedDish.data.message
    }
    catch (err)
    {
        console.log(err)
        return err?.response?.data?.error
    }
}

const removeDish = async (id) =>
{
    try
    {
        const removeDish = await axios.delete(`${baseUrl}/${id}`, config)
        return removeDish.data
    }
    catch (err)
    {
        console.log(err)
        return err?.response?.data?.error
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createDish, getAll, updatedDish, removeDish }