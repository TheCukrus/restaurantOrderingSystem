import Footer from "./pages/footer/Footer.jsx"
import Home from "./pages/homepage/Home.jsx"
import Navbar from "./pages/navbar/Navbar.jsx"
import { Route, Routes } from "react-router-dom"
import Cart from "./pages/cart/Cart.jsx"
import MenuPage from "./pages/menuPage/MeniuPage.jsx"
import OrderTracking from "./pages/orderTracking/OrderTracking.jsx"
import LoginRegister from "./pages/loginRegister/LoginRegister"
import AdminPage from "./pages/admin/AdminPage.jsx"
import { useUserContext } from "./contexts/UserContext.js"
import UnmatchedRoute from "./pages/pageNotFound/UnmatchedRoute.jsx"
import Notification from "./pages/notification/Notification.jsx"
import "./App.css"
import Checkout from "./pages/checkout/Checkout.jsx"

const App = () =>
{

  const { adminRights, user } = useUserContext()

  return (
    <div className="main-container">
      <Navbar />
      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />

        {/* Checking if authorized user to react cart */}
        {user
          ? <Route path="/cart" element={<Cart />} />
          : null
        }

        {user
          ? <Route path="/checkout" element={<Checkout />} />
          : null}

        <Route path="/login" element={<LoginRegister />} />
        <Route path="/tracking" element={<OrderTracking />} />

        {/* Checking if user has rigth to enter admin page */}
        {adminRights
          ? (<Route path="/admin" element={<AdminPage />} />)
          : null
        }

        {/* Create a catch-all route for unmatched paths */}
        <Route path="*" element={<UnmatchedRoute />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App