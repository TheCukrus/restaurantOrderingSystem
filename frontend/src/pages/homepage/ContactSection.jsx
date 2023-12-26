import { useState } from "react"
import "./ContactSection.css"
import { Form, Button, Alert } from "react-bootstrap"
import contactService from "../../services/contact.js"

const ContactSection = () =>
{
    const [mail, setMail] = useState({ name: "", email: "", message: "" })
    const [isMessageSent, setIsMessageSent] = useState(false);

    const handleFormSubmit = async (e) =>
    {
        try
        {
            e.preventDefault();

            await contactService.createMessage(mail)

            setIsMessageSent(true);
            setMail({ name: "", email: "", message: "" })
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (

        <div >
            <div className="contact-form">
                {isMessageSent ? (
                    <Alert variant="success">Thank you for your message!</Alert>
                ) : (
                    <div>
                        <p>If you have any questions or inquiries, feel free to get in touch with us!</p>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={mail.name}
                                    onChange={(e) => setMail({ ...mail, name: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={mail.email}
                                    onChange={(e) => setMail({ ...mail, email: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    as="textarea"  // Specify the component type
                                    rows={4}        // Specify the number of rows
                                    placeholder="Message"
                                    value={mail.message}
                                    onChange={(e) => setMail({ ...mail, message: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Button type="submit">Send Message</Button>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContactSection;
