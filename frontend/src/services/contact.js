import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/contact"

const getToken = () =>
{
    const tokenFromStorage = window.localStorage.getItem("token")
    return tokenFromStorage ? `Bearer ${JSON.parse(tokenFromStorage).token}` : null
}

const setAuthorizationToken = (token) =>
{
    config.headers.authorization = token
}

const config = {
    headers: {
        "authorization": getToken()
    }
}

const getMessages = async () =>
{
    try
    {
        const messages = await axios.get(baseUrl, config)
        return messages.data.messages
    }
    catch (err)
    {
        console.log(err)
    }
}

const createMessage = async (data) =>
{
    try
    {
        const message = await axios.post(baseUrl, data)
        return message.data
    }
    catch (err)
    {
        console.log(err)
    }
}

const markAsRead = async (id) =>
{
    try
    {
        const status = await axios.put(`${baseUrl}/${id}`, null, config)
        return status
    }
    catch (err)
    {
        console.log(err)
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getMessages, createMessage, markAsRead, setAuthorizationToken }