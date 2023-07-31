import Footer from "./pages/footer/Footer.jsx"
import Home from "./pages/homepage/Home.jsx"
import Navbar from "./pages/navbar/Navbar.jsx"
import { Route, Routes } from "react-router-dom"
import Cart from "./pages/cart/Cart.jsx"
import MenuPage from "./pages/menuPage/MeniuPage.jsx"
import OrderTracking from "./pages/orderTracking/OrderTracking.jsx"
import LoginRegister from "./pages/loginRegister/LoginRegister"

const App = () =>
{
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/tracking" element={<OrderTracking />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App