import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import App from "./App"
import { MenuProvider } from "./contexts/MenuContext.js"
import { CartProvider } from "./contexts/CartContext.js"
import { UserProvider } from "./contexts/UserContext.js"
import { NotificationProvider } from "./contexts/NotificationContext.js"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Router>
    <NotificationProvider>
      <UserProvider>
        <MenuProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MenuProvider>
      </UserProvider>
    </NotificationProvider>
  </Router>
)