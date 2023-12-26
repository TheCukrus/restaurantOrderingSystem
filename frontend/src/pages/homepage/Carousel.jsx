import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import menu from "../../services/menu.js";

const Carousel = () => {
    const [dishes, setDishes] = useState([]);

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const fetchMenu = async () => {
        try {
            const data = await menu.getAll();
            setDishes(data.menu);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {dishes.map((dish, index) => (
                    <div key={index} className="carousel-card">
                        <img src={dish.imagePath} alt={dish.title} />
                        <div className="carousel-content">
                            <h3>{dish.title}</h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
