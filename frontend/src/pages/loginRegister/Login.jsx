import { Form } from "react-bootstrap"
import { useState } from "react"
import services from "../../services/user.js"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext.js"
import cartService from "../../services/cart.js"
import { useNotificationContext } from "../../contexts/NotificationContext.js"

const Login = () =>
{

    const { setUser } = useUserContext()
    const { addNotification } = useNotificationContext()

    const homeNav = useNavigate()

    const [loginForm, setLoginForm] = useState({ username: "", password: "" });

    // Function to handle login form submission
    const handleLoginSubmit = async (e) =>
    {
        e.preventDefault()
        try
        {
            const login = await services.login(loginForm)

            if (login.message)
            {
                return addNotification(login.message, "error")
            }

            window.localStorage.setItem("token", JSON.stringify(login))
            setUser(JSON.stringify(login))

            //Update the service's config object with the new token
            cartService.setAuthorizationToken(`Bearer ${login.token}`)

            homeNav("/")
            return addNotification(`Welcome back ${login.username}`, "success")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
            <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="login-username" className="form-group">
                    <Form.Label>Email/Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="login-password" className="form-group">
                    <Form.Label >Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </Form.Group>
                <button type="submit" className="button">Login</button>
            </Form>
        </div>

    )
}

export default Login