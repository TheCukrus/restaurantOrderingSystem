import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import { useUserContext } from "../../contexts/UserContext.js"
import { useCartContext } from "../../contexts/CartContext.js"
import { Badge } from "react-bootstrap"

const Navbar = () =>
{

    const { user, setUser, adminRights, setAdminRights } = useUserContext()
    const { cartItems } = useCartContext()

    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () =>
    {
        setShowDropdown(!showDropdown)
    }

    const closeDropDown = () =>
    {
        setShowDropdown(false)
    }

    const logout = () =>
    {
        window.localStorage.removeItem("token")
        setAdminRights(false)
        setUser(null)
        return
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/images/restaurantLogo.png" alt="Restaurant Logo" />
                </Link>
            </div>

            <button className="navbar-toggler" onClick={toggleDropdown}>
                <img src="/icons/hamburger.svg" alt="Toggle Navigation" />
            </button>

            <ul className={`navbar-links${showDropdown ? " show" : ""}`}>
                <li><Link to="/menu" onClick={closeDropDown}>Menu</Link></li>
                <li><Link to="/tracking" onClick={closeDropDown}>Order Tracking</Link></li>
                {!user
                    ? (<li><Link to="/login" onClick={closeDropDown}>Login/Register</Link></li>)
                    : (
                        <>
                            {adminRights
                                ? (<li><Link to="/admin" onClick={closeDropDown}>Admin</Link></li>)
                                : null
                            }
                            <li><Link to="/cart" onClick={closeDropDown} >Cart {cartItems.length > 0 ? <Badge pill bg="secondary">{cartItems.length}</Badge> : ""}</Link></li>
                            <li> <Link to="/" onClick={() => { closeDropDown(); logout(); }}>Logout</Link></li>
                        </>
                    )
                }
            </ul>
        </nav >
    )
}

export default Navbar