import React, { useEffect, useState } from 'react';
import './BookList.css';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error("Error fetching books:", err));
    }, []);

    const filteredBooks = books.filter((book) => {
        const term = searchTerm.toLowerCase();
        return (
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.genre.toLowerCase().includes(term)
        );
    });

    return (
        <div className="booklist-wrapper">

            {/* 🔍 Search input */}
            <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {/* ✨ Clear button (only shows if user typed something) */}
            {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                    Clear
                </button>
            )}

            {/* 📚 Book list */}
            <div className="booklist-container">
                {filteredBooks.map((book) => (
                    <Link to={`/books/${book.slug}`} key={book.id} className="book-card">
                        <h2
                            dangerouslySetInnerHTML={{
                                __html: book.title.replace(
                                    new RegExp(`(${searchTerm})`, 'gi'),
                                    (match) => `<mark>${match}</mark>`
                                )
                            }}
                        />
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p>{book.description.substring(0, 100)}...</p>
                    </Link>
                ))}
            </div>
        </div>
            );

}

export default BookList;

