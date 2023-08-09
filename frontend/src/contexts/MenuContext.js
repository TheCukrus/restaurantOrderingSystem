import { createContext, useState, useContext, useEffect } from "react"
import menuService from "../services/menu.js"

const MenuContext = createContext()

export function MenuProvider({ children })
{
    const [menu, setMenu] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")

    //Array of unique categories for the dropdown
    const categories = ["All", ...new Set(menu.map(item => item.category))]

    //Fetching menu data from db
    const fetchData = async () =>
    {
        const data = await menuService.getAll()
        setMenu(data.menu)
    }

    useEffect(() =>
    {
        fetchData()
    }, [])

    return (
        <MenuContext.Provider value={{ menu, setMenu, selectedCategory, setSelectedCategory, categories }}>
            {children}
        </MenuContext.Provider>
    )
}

export function useMenuContext()
{
    return useContext(MenuContext)
}