import React from "react";
import "./HeroSection.css";
import heroImage from "../../images/heroSection.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () =>
{
    const nav = useNavigate()

    return (
        <section className="hero-section">
            <img src={heroImage} alt="Delicious Food" className="hero-image" />
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>Savor the Flavors - Order Now!</h1>
                <p>Delicious food is not just for holidays.</p>
                <button onClick={()=> nav("/menu")}className="explore-menu-btn">Explore the Menu</button>
            </div>
        </section>
    );
};

export default HeroSection;
