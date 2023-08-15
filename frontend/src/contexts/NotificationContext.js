import { createContext, useContext, useState } from "react"

const NotificationContext = createContext()

export const useNotificationContext = () =>
{
    return useContext(NotificationContext)
}

export const NotificationProvider = ({ children }) =>
{

    const [notification, setNotification] = useState(null)

    const addNotification = (message, type, duration = 5000) =>
    {
        setNotification({ message, type })

        setTimeout(() =>
        {
            return setNotification(null)
        }, duration)
    }


    return (
        <NotificationContext.Provider value={{ notification, addNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}