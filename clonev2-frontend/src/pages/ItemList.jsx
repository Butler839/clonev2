import { useEffect, useState } from 'react'
import { fetchItems } from '../services/itemService'
import ItemCard from '../components/ItemCard'

function ItemList() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/api/books")
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">All Items</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}


export default ItemList
