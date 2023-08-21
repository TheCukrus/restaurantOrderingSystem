import { useState } from "react"
import { Form } from "react-bootstrap"
import menuService from "../../services/menu.js"
import "./NewDishForm.css"
import { useNotificationContext } from "../../contexts/NotificationContext.js"
import { useMenuContext } from "../../contexts/MenuContext.js"

const NewDishForm = () =>
{
    const { addNotification } = useNotificationContext()
    const { fetchData } = useMenuContext()

    const [newDish, setNewDish] = useState({ title: "", category: "", description: "", price: "", imageName: "" })

    const handleCreateDish = async (e) =>
    {
        e.preventDefault()
        try
        {
            const newDishData = {
                title: newDish.title,
                category: newDish.category,
                description: newDish.description,
                price: parseFloat(newDish.price),
                imagePath: `menuImg/${newDish.imageName}.jpg`,
            }
            await menuService.createDish(newDishData)
            setNewDish({ title: "", category: "", description: "", price: 0, imageName: "" })
            fetchData()
            return addNotification(`${newDish.title} menu item created`, "success")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div className="new-dish-container">
            <h2>New Dish</h2>

            <div className="new-dish-form">
                <Form onSubmit={handleCreateDish}>
                    <Form.Group>
                        <Form.Label htmlFor="dish-title">Title: </Form.Label>
                        <Form.Control
                            type="text"
                            id="dish-title"
                            value={newDish.title}
                            onChange={(e) => setNewDish({ ...newDish, title: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="dish-category">Category: </Form.Label>
                        <Form.Control
                            type="text"
                            id="dish-category"
                            value={newDish.category}
                            onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="dish-description">Description: </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="2"
                            id="dish-description"
                            value={newDish.description}
                            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="dish-price">Price: </Form.Label>
                        <Form.Control
                            type="text"
                            id="dish-price"
                            value={newDish.price}
                            min={0}
                            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="dish-imageName">Image Name: </Form.Label>
                        <Form.Control
                            type="text"
                            id="dish-imageName"
                            value={newDish.imageName}
                            onChange={(e) => setNewDish({ ...newDish, imageName: e.target.value })}
                        />
                    </Form.Group>
                    <button className="submit-btn" type="submit">Create new Dish</button>
                </Form>
            </div>
        </div>
    )
}

export default NewDishForm
