import React from 'react';
import BookList from '../components/BookList';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

function Homepage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    return (
        <div className="homepage-wrapper">
            {/* 🗝️ Top-right user or login */}
            {user ? (
                <div className="login-button" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                        👤 {user.displayName}
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            setUser(null);
                            window.location.reload();
                        }}
                        style={{
                            background: 'transparent',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/login" className="login-button">
                    Login
                </Link>
            )}


            {/* 📬 Top-left link to Library Wall */}
            <Link to="/library-wall" className="library-wall-link">
                🗣️ Library Wall
            </Link>

            <h1 style={{ textAlign: 'center', padding: '1rem' }}>
                📚 Requiem Library
            </h1>

            <BookList />
        </div>
    );
}

export default Homepage;






