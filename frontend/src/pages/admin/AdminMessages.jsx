import { useState, useEffect } from "react"
import messageService from "../../services/contact.js"
import { Table } from "react-bootstrap"
import { useNotificationContext } from "../../contexts/NotificationContext"
import "./AdminMessages.css"
const AdminMessages = () =>
{
    const { addNotification } = useNotificationContext()

    const [messages, setMessages] = useState([])

    const fetchMessages = async () =>
    {
        try
        {
            const data = await messageService.getMessages()
            const sortedMessages = await data.sort((a, b) => (a.readed === b.readed) ? 0 : a.readed ? 1 : -1);
            return setMessages(sortedMessages)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const handleMarkAsReaded = async (id) =>
    {
        try
        {
            const data = await messageService.markAsRead(id)
            addNotification(data.data.message, "success")
            return fetchMessages()
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() =>
    {
        fetchMessages()
    }, [])

    return (
        <div className="messages-container">
            <h2 >Messages</h2>
            <div className="message-table">
                {messages.length === 0
                    ? <p>Loading</p>
                    : <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages?.map((ele, i) =>
                            (
                                <tr key={`${ele.name}.${i}`}>
                                    <td>{ele.name}</td>
                                    <td>{ele.email}</td>
                                    <td>{ele.message}</td>
                                    <td>
                                        {ele.readed ? (
                                            <span className="readed-status">Readed</span>
                                        ) : (
                                            <button
                                                className="mark-as-read"
                                                onClick={() => handleMarkAsReaded(ele.id)}
                                            >
                                                Mark as readed
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }
            </div>
        </div>
    )
}

export default AdminMessages