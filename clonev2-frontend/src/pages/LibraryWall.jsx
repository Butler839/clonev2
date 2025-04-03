import React, { useEffect, useState } from 'react';
import './LibraryWall.css';

function LibraryWall({ books }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTrendingWord, setActiveTrendingWord] = useState(null);
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});
    const [hoveredBookId, setHoveredBookId] = useState(null);
    const [theme, setTheme] = useState('light');

    const quotes = [
        { text: "The unexamined life is not worth living.", author: "Socrates" },
        { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
        { text: "Freedom is the freedom to say that two plus two make four.", author: "George Orwell" },
        { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { text: "All that is gold does not glitter.", author: "J.R.R. Tolkien" },
        { text: "I rebel — therefore we exist.", author: "Albert Camus" }
    ];

    const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);

            fetch('/api/posts')
                .then(res => res.json())
                .then(data => {
                    setPosts(data);
                    const filtered = data.filter(post => post.author === parsed.displayName);
                    setUserPosts(filtered);
                })
                .catch(err => console.error('Post fetch error:', err));
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const submitPost = (e) => {
        e.preventDefault();
        const post = { author: user.displayName, content };

        fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(newPost => {
                setPosts(prev => [newPost, ...prev]);
                setContent('');
            });
    };

    const handleLike = (postId) => {
        fetch(`/api/posts/${postId}/like`, { method: 'POST' })
            .then(res => res.json())
            .then(updatedPost => {
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId ? { ...post, likes: updatedPost.likes } : post
                    )
                );
            });
    };

    const toggleComments = (postId) => {
        if (Array.isArray(comments[postId])) return;
        fetch(`/api/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => setComments(prev => ({ ...prev, [postId]: data })))
            .catch(err => console.error('Comment fetch error:', err));
    };

    const handleCommentSubmit = (e, postId) => {
        e.preventDefault();
        const text = commentInputs[postId];
        if (!text || !text.trim()) return;

        const comment = {
            commenter: user.displayName,
            content: text,
        };

        fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(newComment => {
                setComments(prev => ({
                    ...prev,
                    [postId]: [...(prev[postId] || []), newComment]
                }));
                setCommentInputs(prev => ({ ...prev, [postId]: '' }));
            });
    };

    const getTrendingKeywords = () => {
        const allWords = posts.flatMap(post => (post.content ? post.content.split(/\s+/) : []));
        const keywordSet = new Set(books.flatMap(b => [b.title, b.author, b.genre]));
        const freqMap = {};

        allWords.forEach(word => {
            const normalized = word.toLowerCase();
            if (Array.from(keywordSet).some(kw => kw.toLowerCase() === normalized)) {
                freqMap[normalized] = (freqMap[normalized] || 0) + 1;
            }
        });

        return Object.entries(freqMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);
    };

    const trending = getTrendingKeywords();

    const topLikedPostIds = [...posts]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3)
        .map(post => post.id);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTrending = activeTrendingWord ? post.content.toLowerCase().includes(activeTrendingWord.toLowerCase()) : true;
        return matchesSearch && matchesTrending;
    });

    return (
        <div className="library-wall-grid">
            <div className="wall-sidebar redesigned">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>

                <div className="sidebar-card quote-box">
                    <h4>📖 Quote of the Day</h4>
                    <blockquote className="quote">
                        “{quote.text}”
                        <footer className="quote-author">– {quote.author}</footer>
                    </blockquote>
                </div>

                <div className="sidebar-card trending-box">
                    <h4>📈 Trending</h4>
                    <ul className="trending-tags">
                        {trending.map(word => (
                            <li
                                key={word}
                                className={activeTrendingWord === word ? 'active-trend' : ''}
                                onClick={() => setActiveTrendingWord(activeTrendingWord === word ? null : word)}
                            >
                                #{word}
                            </li>
                        ))}
                    </ul>
                </div>

                {user ? (
                    <div className="sidebar-card profile-preview">
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
                        <a href="/profile" className="profile-link">View Full Profile →</a>
                    </div>
                ) : (
                    <div className="wall-profile-placeholder">
                        Please <a href="/login">log in</a> to see your profile.
                    </div>
                )}
            </div>

            <div className="wall-posts-area">
                {filteredPosts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    filteredPosts.map(post => {
                        const postComments = Array.isArray(comments[post.id]) ? comments[post.id] : [];
                        const isTrending = topLikedPostIds.includes(post.id);
                        return (
                            <div key={post.id} className="wall-post upgraded fade-in">
                                <div className="meta author-row">
                                    <img
                                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${post.author.toLowerCase()}`}
                                        alt="avatar"
                                        className="avatar-sm"
                                    />
                                    <span className="author-name">{post.author}</span>
                                    {isTrending && <span className="trending-badge">🔥 Trending</span>}
                                </div>

                                <p className="post-content">{post.content}</p>

                                {post.book && (
                                    <a
                                        href={`/books/${post.book.slug}`}
                                        className="post-book-link"
                                        onMouseEnter={() => setHoveredBookId(post.id)}
                                        onMouseLeave={() => setHoveredBookId(null)}
                                    >
                                        <div className="book-pill">
                                            <div className="book-icon">📘</div>
                                            <div className="book-details">
                                                <div className="book-title">{post.book.title}</div>
                                                <div className="book-meta">{post.book.author} — {post.book.genre}</div>
                                            </div>
                                        </div>

                                        {hoveredBookId === post.id && (
                                            <div className="book-hover-card">
                                                <strong>{post.book.title}</strong>
                                                <p className="hover-meta">{post.book.author} — {post.book.genre}</p>
                                                <p className="hover-description">{post.book.description}</p>
                                            </div>
                                        )}
                                    </a>
                                )}

                                <div className="post-actions">
                                    <button className="like-button" onClick={() => handleLike(post.id)}>
                                        ❤️ {post.likes || 0}
                                    </button>
                                    <button className="comment-button" onClick={() => toggleComments(post.id)}>
                                        💬 Comments ({postComments.length})
                                    </button>
                                </div>

                                {postComments.length > 0 && (
                                    <div className="comment-section">
                                        <h4>💬 Comments</h4>
                                        {postComments.map(comment => (
                                            <div key={comment.id} className="comment">
                                                <div className="comment-header">
                                                    <img
                                                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${comment.commenter.toLowerCase()}`}
                                                        alt="avatar"
                                                        className="avatar-sm"
                                                    />
                                                    <span className="comment-meta">– {comment.commenter}</span>
                                                </div>
                                                <p className="comment-content">“{comment.content}”</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {user && (
                                    <form
                                        onSubmit={(e) => handleCommentSubmit(e, post.id)}
                                        className="comment-form"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            value={commentInputs[post.id] || ''}
                                            onChange={(e) =>
                                                setCommentInputs(prev => ({
                                                    ...prev,
                                                    [post.id]: e.target.value
                                                }))
                                            }
                                            className="comment-input"
                                        />
                                        <button type="submit" className="comment-submit">Reply</button>
                                    </form>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {user ? (
                <form onSubmit={submitPost} className="wall-post-overlay">
                    <input
                        type="text"
                        value={user.displayName}
                        className="overlay-name"
                        readOnly
                    />
                    <textarea
                        placeholder="Share something..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="overlay-content"
                    />
                    <button type="submit" className="overlay-submit">Post</button>
                </form>
            ) : (
                <div className="wall-post-overlay wall-post-disabled">
                    <p>Please <a href="/login">log in</a> to post.</p>
                </div>
            )}
        </div>
    );
}

export default LibraryWall;



