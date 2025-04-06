import React, { useEffect, useState } from 'react';
import './ProfileStyles.css';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setNewDisplayName(parsed.displayName);

            api('/api/posts')
                .then(res => res.json())
                .then(data => {
                    const filtered = data.filter(p => p.author === parsed.displayName);
                    setPosts(filtered);
                });
        }
    }, []);

    const handleDisplayNameUpdate = () => {
        api(`/api/users/${user.username}`, {
            method: 'PATCH',
            body: JSON.stringify({ displayName: newDisplayName }),
        })
            .then(res => res.json())
            .then(updated => {
                localStorage.setItem('user', JSON.stringify(updated));
                setUser(updated);
                setEditing(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            });
    };

    if (!user) {
        return <div className="profile-container">Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container">
            <Link to="/" className="back-button">← Back to Homepage</Link>

            <div className="profile-banner">
                <img
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                    alt="avatar"
                    className="profile-avatar"
                />
                <h2 className="profile-title">👤 {user.displayName}'s Profile</h2>
            </div>

            <div className="profile-info">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>

                <p>
                    <strong>Display Name:</strong>{' '}
                    {editing ? (
                        <>
                            <input
                                value={newDisplayName}
                                onChange={(e) => setNewDisplayName(e.target.value)}
                                className="edit-input"
                            />
                            <button onClick={handleDisplayNameUpdate} className="edit-button">Save</button>
                        </>
                    ) : (
                        <>
                            {user.displayName}{' '}
                            <button onClick={() => setEditing(true)} className="edit-button">Edit</button>
                        </>
                    )}
                </p>
            </div>

            {showSuccess && <div className="toast-success">✅ Display name updated!</div>}

            <div className="profile-posts">
                <h3>Your Posts</h3>
                <p className="profile-post-count">🗣️ {posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>

                {posts.map(post => (
                    <div key={post.id} className="profile-post-item">
                        <p className="profile-post-content">{post.content}</p>
                        <p className="profile-post-date">📅 {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;



