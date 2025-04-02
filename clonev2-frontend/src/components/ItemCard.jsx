import { Link } from 'react-router-dom'

function ItemCard({ item }) {
    return (
        <Link to={`/items/${item.id}`}>
            <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
                <h2 className="text-xl font-bold mb-1">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.author}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-2">{item.genre}</p>
            </div>
        </Link>
    )
}

export default ItemCard
