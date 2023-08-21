import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/"
}
else
{
    baseUrl = "https://restaurantordersystem.onrender.com/api/"
}

const getToken = () =>
{
    const tokenFromLocalstorage = window.localStorage.getItem("token")
    return tokenFromLocalstorage ? `Bearer ${JSON.parse(tokenFromLocalstorage).token}` : null
}

const setAuthorizationToken = (token) =>
{
    config.headers.authorization = token
}

const config = {
    headers: { "authorization": getToken() }
}

const createUser = async (data) =>
{
    try
    {
        const user = await axios.post(`${baseUrl}users`, data)
        // console.log(user)
        return user.data.message
    }
    catch (err)
    {
        console.log(err)
        return err.response.data.message
    }
}

const login = async (data) =>
{
    try
    {
        const login = await axios.post(`${baseUrl}login`, data)
        return login.data
    }
    catch (err)
    {
        console.log(err)
        return err?.response?.data
    }
}

const adminPageAccess = async () =>
{
    try
    {


        const admin = await axios.get(`${baseUrl}admin`, config)
        return admin.data
    }
    catch (err)
    {
        return err?.response?.data
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser, login, adminPageAccess, setAuthorizationToken }