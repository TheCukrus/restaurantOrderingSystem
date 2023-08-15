import { createContext, useContext, useState, useEffect } from "react"
import service from "../services/user.js"

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
        setUser(token)
    }, [])

    //Checking for admin rights
    useEffect(() =>
    {
        checkAdminRights()
    },[user])

    // console.log(adminRights)
    // console.log(JSON.parse(user))

    return (
        <UserContext.Provider value={{ user, setUser, adminRights }}>
            {children}
        </UserContext.Provider>
    )
}