import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useUserContext } from "../../contexts/UserContext.js";
import { useCartContext } from "../../contexts/CartContext.js";
import { Badge } from "react-bootstrap";

const Navbar = () => {
    const { user, setUser, adminRights, setAdminRights } = useUserContext();
    const { cartItems } = useCartContext();

    const [showDropdown, setShowDropdown] = useState(false);

    const logout = () => {
        window.localStorage.removeItem("token");
        setAdminRights(false);
        setUser(null);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/images/restaurantLogo.png" alt="Restaurant Logo" className="navbar-logo-img" />
                </Link>
            </div>
            <div className={`navbar-menu ${showDropdown ? 'active' : ''}`}>
                <Link to="/menu" className="navbar-link">Menu</Link>
                <Link to="/tracking" className="navbar-link">Order Tracking</Link>
                {user ? (
                    <>
                        {adminRights && <Link to="/admin" className="navbar-link">Admin</Link>}
                        <Link to="/cart" className="navbar-link">
                            Cart <Badge pill bg="secondary">{cartItems.length}</Badge>
                        </Link>
                        <Link to="/" onClick={logout} className="navbar-link">Logout</Link>
                    </>
                ) : (
                    <Link to="/login" className="navbar-link">Login/Register</Link>
                )}
                <button className="navbar-toggler" onClick={() => setShowDropdown(!showDropdown)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
