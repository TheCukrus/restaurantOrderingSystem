import { useState, useEffect } from "react"
import Carousel from "./Carousel.jsx"
import HeroSection from "./HeroSection.jsx"
import Testimonial from "./Testimonial.jsx"
import testimonialService from "../../services/testimonial.js"
import "./Home.css"
import { Pagination } from "react-bootstrap"
import ContactSection from "./ContactSection.jsx"

const Home = () =>
{
    const [testimonial, setTestimonial] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3

    const fetchData = async () =>
    {
        try
        {
            const data = await testimonialService.getTestimonials()
            return setTestimonial(data.message)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() =>
    {
        fetchData()
    }, [])

    const totalItems = testimonial.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) =>
    {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleTestimonials = testimonial.slice(
        startIndex,
        startIndex + itemsPerPage
    );


    return (
        <div className="home-container">
            <HeroSection />
            <Carousel />

            <h2 className="home-h2">Best reviews</h2>

            {visibleTestimonials.map((ele, index) => (
                <Testimonial
                    key={ele.name}
                    name={ele.name}
                    date={ele.Date}
                    content={ele.content}
                    className={currentPage !== 1 ? "fadeIn" : ""}
                />
            ))}

            <div className="pagination-container">
                <Pagination>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>

            <ContactSection />
        </div>
    )
}

export default Home