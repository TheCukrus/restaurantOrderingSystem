import NewDishForm from "./NewDishForm.jsx"
import MenuList from "./MenuList.jsx"
import AdminTestimonial from "./AdminTestimonial.jsx"
import AdminMessages from "./AdminMessages.jsx"
import "./AdminPage.css"

const AdminPage = () =>
{

    return (
        <div className="admin-page">
            <NewDishForm />

            {/* Component for listing all dishes */}
            <MenuList />

            {/*Component for Testimonial creation*/}
            <AdminTestimonial />

            {/* Component for checking messages */}
            <AdminMessages />
        </div>
    )
}

export default AdminPage
