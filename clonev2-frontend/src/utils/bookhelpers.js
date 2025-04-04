export function filterBooks(books, searchTerm) {
    const term = searchTerm.toLowerCase();
    return books.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
    );
}
