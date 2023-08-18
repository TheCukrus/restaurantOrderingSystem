import React from "react"
import "./HeroSection.css"
import heroImage from "../../images/heroSection.jpg"
import { Link } from "react-router-dom"

const HeroSection = () =>
{
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Savor the Flavors - Order Now!</h1>
                <p>Delicious food is not only during holidays.</p>
                <Link className="explore-menu-btn" to="/menu">Explore the Menu</Link>
            </div>
            <img src={heroImage} alt="Delicious Food" className="hero-image" />
        </div>
    );
};

export default HeroSection