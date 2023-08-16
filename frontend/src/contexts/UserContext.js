import { createContext, useContext, useState, useEffect } from "react"
import service from "../services/user.js"
import jwt_decode from "jwt-decode"

const UserContext = createContext()

export const useUserContext = () =>
{
    return useContext(UserContext)
}

export const UserProvider = ({ children }) =>
{
    //State for user data
    const [user, setUser] = useState(null)
    //State for checking adminRights
    const [adminRights, setAdminRights] = useState(false)

    //Checking for admin role
    const checkAdminRights = async () =>
    {
        try
        {
            const admin = await service.adminPageAccess()
            setAdminRights(admin.message === "Access granted")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    //Checking is there is token in localstorage
    useEffect(() =>
    {
        const token = window.localStorage.getItem("token")
        if (token)
        {
            const decodedToken = jwt_decode(token)
            const expirationTime = decodedToken.exp * 1000

            if (expirationTime < Date.now())
            {
                window.localStorage.removeItem("token")
                setUser(null)
            }
            else
            {
                setUser(token)
            }
        }
    }, [])

    //Checking for admin rights
    useEffect(() =>
    {
        if (!user)
        {
            return
        }
        checkAdminRights()
    }, [user])

    // console.log(adminRights)
    // console.log(JSON.parse(user))

    return (
        <UserContext.Provider value={{ user, setUser, adminRights }}>
            {children}
        </UserContext.Provider>
    )
}