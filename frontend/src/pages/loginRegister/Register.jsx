import { useState } from "react"
import { Form } from "react-bootstrap"
import service from "../../services/user.js"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext.js"
import { useNotificationContext } from "../../contexts/NotificationContext.js"

const Register = () =>
{
    const { setUser } = useUserContext()
    const { addNotification } = useNotificationContext()

    const homeNav = useNavigate()

    // State for form fields
    const [registerForm, setRegisterForm] = useState({ username: "", name: "", email: "", password: "" });

    // Function to handle register form submission
    const handleRegisterSubmit = async (e) =>
    {
        try
        {
            e.preventDefault()

            //registration
            const user = await service.createUser(registerForm)

            if (user !== "User created")
            {
                return addNotification(user, "error")
            }
            setRegisterForm({ username: "", name: "", email: "", password: "" })

            //login
            const login = await service.login(
                {
                    "username": registerForm.username,
                    "password": registerForm.password
                })

            window.localStorage.setItem("token", JSON.stringify(login))
            setUser(JSON.stringify(login))
            homeNav("/")
            return addNotification(`Congrats with registration ${login.username}`, "success")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (

        <div className="form-container">
            <h2>Register</h2>
            <Form onSubmit={handleRegisterSubmit}>
                <Form.Group controlId="register-username" className="form-group">
                    <Form.Label>UserName:</Form.Label>
                    <Form.Control
                        type="text"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="register-name" className="form-group">
                    <Form.Label >Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="register-email" className="form-group">
                    <Form.Label >Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="register-password" className="form-group">
                    <Form.Label >Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                </Form.Group>
                <button type="submit" className="button">Register</button>
            </Form>
        </div>
    )
}

export default Register
