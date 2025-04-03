import React, { useEffect, useState } from 'react';
import './LibraryWall.css';

function LibraryWall({ books }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});

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
        if (comments[postId]) return;
        fetch(`/api/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => setComments(prev => ({ ...prev, [postId]: data })));
    };

    const handleCommentChange = (postId, value) => {
        setCommentInputs(prev => ({ ...prev, [postId]: value }));
    };

    const submitComment = (postId) => {
        const content = commentInputs[postId];
        if (!content) return;

        const commentData = {
            commenter: user.displayName,
            content,
        };

        fetch(`/api/comments/${postId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
        })
            .then(res => res.json())
            .then(() => {
                fetch(`/api/posts/${postId}/comments`)
                    .then(res => res.json())
                    .then(data => {
                        setComments(prev => ({ ...prev, [postId]: data }));
                        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
                    });
            });
    };

    const filteredPosts = posts.filter(post =>
        post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <div className="library-wall-grid">
            {/* Sidebar */}
            <div className="wall-sidebar">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="wall-search"
                />

                {user ? (
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
                        <a href="/profile" className="profile-link">View Full Profile →</a>
                    </div>
                ) : (
                    <div className="wall-profile-placeholder">
                        Please <a href="/login">log in</a> to see your profile.
                    </div>
                )}

                <div className="trending-box">
                    <h4>📈 Trending</h4>
                    <ul>
                        {trending.map(word => <li key={word}>#{word}</li>)}
                    </ul>
                </div>
            </div>

            {/* Posts Feed */}
            <div className="wall-posts-area">
                {filteredPosts.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    filteredPosts.map(post => (
                        <div key={post.id} className="wall-post">
                            <p>{post.content}</p>
                            <p className="meta">– {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
                            <button className="like-button" onClick={() => handleLike(post.id)}>
                                ❤️ {post.likes || 0}
                            </button>
                            <button className="comment-button" onClick={() => toggleComments(post.id)}>
                                💬 Comments
                            </button>
                            {comments[post.id]?.map(c => (
                                <div key={c.id} className="comment">
                                    <p>{c.content}</p>
                                    <small>– {c.commenter}</small>
                                </div>
                            ))}

                            {user && (
                                <div className="comment-form">
                                    <textarea
                                        placeholder="Write a comment..."
                                        value={commentInputs[post.id] || ''}
                                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        className="comment-input"
                                    />
                                    <button
                                        className="comment-submit"
                                        onClick={() => submitComment(post.id)}
                                    >
                                        ➤ Comment
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Post Overlay */}
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



