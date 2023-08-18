import React from "react"
import "./Testimonial.css"

const Testimonial = ({ name, content, date }) =>
{
    const dateObject = new Date(date)

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    let timeFormat = "AM";
    let adjustedHours = hours;
    if (hours >= 12)
    {
        timeFormat = "PM";
        adjustedHours = String(hours - 12).padStart(2, "0");
    }

    const formattedDate = `${year}-${month}-${day} ${adjustedHours}:${minutes} ${timeFormat}`

    return (
        <div className="testimonial">
            <p className="testimonial-name">{name}</p>
            <p className="testimonial-date">{formattedDate}</p>
            <p className="testimonial-content">{content}</p>
        </div>
    )
}

export default Testimonial