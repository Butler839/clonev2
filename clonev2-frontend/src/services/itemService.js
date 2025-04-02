const BASE_URL = 'http://localhost:8080/api/books'

export async function fetchItems() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch items');
    return await res.json();
}
