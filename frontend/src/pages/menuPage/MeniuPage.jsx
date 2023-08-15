import "./MeniuPage.css"
import { useMenuContext } from "../../contexts/MenuContext.js"
import { useCartContext } from "../../contexts/CartContext.js"
import { useUserContext } from "../../contexts/UserContext.js"
import { useNotificationContext } from "../../contexts/NotificationContext.js"
import { useNavigate } from "react-router-dom"

const MenuPage = () =>
{
  const { menu, selectedCategory, setSelectedCategory, categories } = useMenuContext()
  const { addToCart, cartItems } = useCartContext()
  const { user } = useUserContext()
  const { addNotification } = useNotificationContext()

  const navigate = useNavigate()

  // Filter menu items by category
  const filteredMenuItems = selectedCategory === 'All'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) =>
  {
    if (!user)
    {
      navigate("/login")
      addNotification("To add dish, you must login", "error")
    }
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingCartItem)
    {
      //If item is already in the cart, update its quantity
      addToCart({ ...item, quantity: existingCartItem.quantity + 1 })
      addNotification(`Add ${item.title} to the cart`, "success")
    }
    else
    {
      //If item is not in the cart, add it with quantity
      addToCart({ ...item, quantity: 1 })
    }
  }

  return (
    <div className="menu-page">
      {/* Dropdown for filtering by categories */}
      <div className="category-dropdown">
        <label htmlFor="category-select">Filter by Category:</label>
        <select id="category-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Menu items list */}
      <div className="menu-items">
        {filteredMenuItems.map(item => (
          <div key={item.id} className="menu-item">
            <img src={item.imagePath} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPage
