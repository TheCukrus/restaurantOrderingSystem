import s from "./MenuList.module.css"
import { Table } from "react-bootstrap"
import { useMenuContext } from "../../contexts/MenuContext.js"
import { useNotificationContext } from "../../contexts/NotificationContext"
import menuService from "../../services/menu.js"

const MenuList = () =>
{
    const { menu, setMenu, selectedCategory, setSelectedCategory, categories, fetchData } = useMenuContext()
    const { addNotification } = useNotificationContext()

    const handleSaveDish = async (dish) =>
    {
        try
        {
            const updatedDish = await menuService.updatedDish(dish)
            return addNotification(updatedDish, "success")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const handleRemoveDish = async (id) =>
    {
        try
        {
            const removeDish = await menuService.removeDish(id)
            fetchData()
            return addNotification(removeDish.message, "success")

        }
        catch (err)
        {
            console.log(err)
        }
    }

    //Filter menu items by category
    const filteredMenuItems = selectedCategory === "All"
        ? menu
        : menu.filter(item => item.category === selectedCategory)

    return (
        <div className={s.container}>
            <h2>List of All Dishes</h2>

            {/* Dropdown for filtering by categories */}
            <div className={s.categoryDropdown}>
                <label htmlFor="category-select">Filter by Category:</label>
                <select id="category-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className={s.tableResponsive}>
                <Table className={s.table} responsive>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price ($)</th>
                            <th>Image name and path</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMenuItems.map((dish) => (
                            <tr key={dish.id}>
                                <td>
                                    <img className={s.image} src={dish.imagePath} alt={dish.title} />
                                </td>

                                <td>
                                    <input
                                        name="dish-title"
                                        type="text"
                                        value={dish.title}
                                        onChange={(e) =>
                                            setMenu((prevMenu) =>
                                                prevMenu.map((item) =>
                                                    item.id === dish.id
                                                        ? { ...item, title: e.target.value }
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <textarea
                                        name="dish-description"
                                        type="text"
                                        value={dish.description}
                                        onChange={(e) =>
                                            setMenu((prevMenu) =>
                                                prevMenu.map((item) =>
                                                    item.id === dish.id
                                                        ? { ...item, description: e.target.value }
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        name="dish-price"
                                        type="number"
                                        value={dish.price}
                                        min={0}
                                        onChange={(e) =>
                                            setMenu((prevMenu) =>
                                                prevMenu.map((item) =>
                                                    item.id === dish.id
                                                        ? { ...item, price: e.target.value }
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        name="dish-imagePath"
                                        type="text"
                                        value={dish.imagePath}
                                        onChange={(e) =>
                                            setMenu((prevMenu) =>
                                                prevMenu.map((item) =>
                                                    item.id === dish.id
                                                        ? { ...item, imagePath: e.target.value }
                                                        : item
                                                )
                                            )
                                        }
                                    />
                                </td>

                                <td>
                                    <button className={s.saveBtn} onClick={() => handleSaveDish(dish)}>Save</button>
                                    <button className={s.removeBtn} onClick={() => handleRemoveDish(dish.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MenuList
