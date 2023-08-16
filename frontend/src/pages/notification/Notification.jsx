import { useNotificationContext } from "../../contexts/NotificationContext.js"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Notification = () =>
{
    const { notification } = useNotificationContext()

    if (notification)
    {
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {notification && notify(notification.message, notification.type)}
            </>
        )
    }

}

export const notify = (message, type) =>
{
    toast(message, { type });
}


export default Notification