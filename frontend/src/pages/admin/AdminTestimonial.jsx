import { useState } from "react"
import testimonialService from "../../services/testimonial.js"
import { useNotificationContext } from "../../contexts/NotificationContext.js"
import { Form } from "react-bootstrap"
import "./AdminTestimonial.css"

const AdminTestimonial = () =>
{
    const [testimonialData, setTestimonialData] = useState({ name: "", content: "" })

    const { addNotification } = useNotificationContext()

    const handleOnSubmit = async (e) =>
    {
        e.preventDefault()
        try
        {
            await testimonialService.createTestimonial(testimonialData)
            setTestimonialData({ name: "", content: "" })

            return addNotification("Testimonial created", "success")
        }
        catch (err)
        {
            console.log(err)
            return addNotification("Something go wrong", "error")
        }
    }

    return (
        <div className="admin-testimonial-container">
            <h2>Create Testimonial</h2>

            <div className="admin-testimonial-form-container">
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={testimonialData.name}
                            onChange={(e) => setTestimonialData({ ...testimonialData, name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control
                            as="textarea"  // Specify the component type
                            rows={4}        // Specify the number of rows
                            value={testimonialData.content}
                            onChange={(e) => setTestimonialData({ ...testimonialData, content: e.target.value })}
                        />
                    </Form.Group>
                    <input className="submit-button" type="submit" />
                </Form>
            </div>
        </div>
    )
}

export default AdminTestimonial