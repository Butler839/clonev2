import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Homepage({ books }) {
    const [user, setUser] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const stored = localStorage.getItem('user');

        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) throw new Error("Invalid post data");

                const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecentPosts(sorted.slice(0, 3));

                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(parsed);
                    const userPosts = sorted.filter(p => p.author === parsed.displayName);
                    setUserPosts(userPosts);
                }
            })
            .catch(err => console.error("Failed to fetch posts:", err));
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>📚 Requiem Library</h1>
                <div className="user-controls">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                    {user ? (
                        <>
                            <Link to="/profile" className="profile-link">👤 {user.displayName}</Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    setUser(null);
                                    window.location.reload();
                                }}
                                className="logout-button"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="login-button">Login</Link>
                    )}
                </div>
            </header>

            {/* Library Wall Section */}
            <div className="section-card">
                <div className="section-header">
                    <h2>🗣️ Library Wall</h2>
                    <Link to="/library-wall" className="view-all-link">→ View All</Link>
                </div>
                <div className="post-preview-list">
                    {recentPosts.map(post => (
                        <div key={post.id} className="post-preview">
                            <p className="preview-content">“{post.content.slice(0, 100)}...”</p>
                            <p className="preview-meta">– {post.author}</p>
                        </div>
                    ))}
                    {recentPosts.length === 0 && <p className="no-preview">No posts yet.</p>}
                </div>
            </div>

            {/* Featured Books Section */}
            <div className="section-card">
                <div className="section-header">
                    <h2>📖 Featured Books</h2>
                    <Link to="/books" className="view-all-link">→ View All</Link>
                </div>
                <div className="post-preview-list">
                    {books.slice(0, 3).map(book => (
                        <Link
                            to={`/books/${book.slug}`}
                            key={book.id}
                            className="book-preview"
                        >
                            <p className="preview-content">“{book.title}”</p>
                            <p className="preview-meta">by {book.author}</p>
                        </Link>
                    ))}
                    {books.length === 0 && <p className="no-preview">No books available yet.</p>}
                </div>
            </div>

            {/* Profile Section */}
            {user && (
                <div className="section-card">
                    <div className="section-header">
                        <h2>👤 Your Profile</h2>
                        <Link to="/profile" className="view-all-link">→ View Profile</Link>
                    </div>
                    <div className="profile-preview">
                        <img
                            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                            alt="avatar"
                            className="avatar"
                        />
                        <p><strong>{user.displayName}</strong></p>
                        <p style={{ fontSize: '0.9rem', color: '#777' }}>{user.username}</p>
                        <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                            🗣️ {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
                        </p>

                        {userPosts.length > 0 && (
                            <div className="last-post">
                                <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>📝 Your Latest Post:</p>
                                <blockquote className="last-post-content">
                                    “{userPosts[0].content.slice(0, 100)}...”
                                </blockquote>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;










