import { useState, useEffect } from "react"

function AdminPanel() {
    const [items, setItems] = useState([])
    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        genre: "FICTION",
    })

    useEffect(() => {
        fetch("http://localhost:8080/api/books")
            .then(res => res.json())
            .then(setItems)
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(res => res.json())
            .then(newItem => {
                setItems([...items, newItem])
                setForm({ title: "", author: "", description: "", genre: "FICTION" })
            })
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/books/${id}`, {
            method: "DELETE",
        }).then(() => setItems(items.filter(item => item.id !== id)))
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={form.author}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <select
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                >
                    <option value="FICTION">Fiction</option>
                    <option value="NON_FICTION">Non-fiction</option>
                    <option value="FANTASY">Fantasy</option>
                    <option value="ROMANCE">Romance</option>
                    <option value="SCIENCE">Science</option>
                    <option value="MYSTERY">Mystery</option>
                    <option value="BIOGRAPHY">Biography</option>
                    <option value="CHILDREN">Children</option>
                    <option value="HISTORY">History</option>
                    <option value="OTHER">Other</option>
                </select>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Add Item
                </button>
            </form>

            <div className="grid gap-4">
                {items.map(item => (
                    <div key={item.id} className="border p-4 rounded bg-white shadow">
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-gray-600">{item.author}</p>
                        <p className="text-sm text-gray-400">{item.genre}</p>
                        <button
                            className="mt-2 text-red-500 hover:underline"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPanel
