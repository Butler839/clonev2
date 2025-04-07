import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/BookList.css';
import { filterBooks } from '../utils/bookhelpers.js';
import { api } from '../utils/api.js';

function BookList() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        api('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error("Error fetching books:", err));
    }, []);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                document.querySelector('.search-bar')?.focus();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const filteredBooks = filterBooks(books, searchTerm);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="booklist-wrapper">
            <div className="booklist-header">
                <h1 className="booklist-title">📚 Explore the Requiem Library</h1>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>

            <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                    Clear
                </button>
            )}

            <div className="booklist-container">
                {filteredBooks.map((book) => (
                    <Link to={`/books/${book.slug}`} key={book.id} className="book-card">
                        <h2>{book.title}</h2>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p>{book.description.substring(0, 100)}...</p>
                    </Link>
                ))}
                {filteredBooks.length === 0 && (
                    <p className="no-results">No books match your search.</p>
                )}
            </div>
        </div>
    );
}

export default BookList;




