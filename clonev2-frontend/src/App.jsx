import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import BookDetail from './pages/BookDetail';
import LibraryWall from './pages/LibraryWall';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookList from './pages/BookList';
import { api } from './utils/api.js';

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        api('/api/books')
            .then((res) => res.json())
            .then(setBooks)
            .catch((err) => console.error("Failed to fetch books:", err));
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Homepage books={books} />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:slug" element={<BookDetail />} />
            <Route path="/library-wall" element={<LibraryWall books={books} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
