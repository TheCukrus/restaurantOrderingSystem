import { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Carousel.css"
import menu from "../../services/menu.js"

const Carousel = () =>
{
    const [dishes, setDishes] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    const fetchMenu = async () =>
    {
        try
        {
            const data = await menu.getAll()
            return setDishes(data.menu)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() =>
    {
        fetchMenu()
    }, [])

    return (
        <div className="carousel-container">
            <div className="carousel-title">
                <h2>Most popular dishes</h2>
            </div>
            <Slider {...settings}>
                <div className="carousel-card">
                    <img src={dishes[0]?.imagePath} alt={dishes[0]?.title} />
                    <div className="carousel-content">
                        <h3>{dishes[0]?.title}</h3>
                    </div>
                </div>
                <div className="carousel-card">
                    <img src={dishes[1]?.imagePath} alt={dishes[1]?.title} />
                    <div className="carousel-content">
                        <h3>{dishes[1]?.title}</h3>
                    </div>
                </div>
                <div className="carousel-card">
                    <img src={dishes[2]?.imagePath} alt={dishes[2]?.title} />
                    <div className="carousel-content">
                        <h3>{dishes[2]?.title}</h3>
                    </div>
                </div>
                <div className="carousel-card">
                    <img src={dishes[3]?.imagePath} alt={dishes[3]?.title} />
                    <div className="carousel-content">
                        <h3>{dishes[3]?.title}</h3>
                    </div>
                </div>

            </Slider>

        </div>
    )
}

export default Carousel