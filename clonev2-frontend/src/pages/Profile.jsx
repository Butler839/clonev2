import React, { useEffect, useState } from 'react';

function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setNewDisplayName(parsed.displayName);

            fetch('/api/posts')
                .then(res => res.json())
                .then(data => {
                    const userPosts = data.filter(post => post.author === parsed.displayName);
                    setPosts(userPosts);
                });
        }
    }, []);

    const handleDisplayNameUpdate = () => {
        fetch(`/api/users/${user.username}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayName: newDisplayName }),
        })
            .then(res => res.json())
            .then(updated => {
                localStorage.setItem('user', JSON.stringify(updated));
                setUser(updated);
                setEditing(false);
            });
    };

    if (!user) return <p style={{ padding: '2rem' }}>You must be logged in to view your profile.</p>;

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
            <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                alt="avatar"
                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1rem' }}
            />
            <h2>👤 {user.displayName}'s Profile</h2>

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <p>
                <strong>Display Name:</strong>{' '}
                {editing ? (
                    <>
                        <input
                            value={newDisplayName}
                            onChange={(e) => setNewDisplayName(e.target.value)}
                            style={{ padding: '0.3rem' }}
                        />
                        <button onClick={handleDisplayNameUpdate} style={{ marginLeft: '0.5rem' }}>Save</button>
                    </>
                ) : (
                    <>
                        {user.displayName}{' '}
                        <button onClick={() => setEditing(true)} style={{ marginLeft: '0.5rem' }}>
                            Edit
                        </button>
                    </>
                )}
            </p>

            <h3 style={{ marginTop: '2rem' }}>🗣️ Your Posts</h3>
            <p style={{ fontStyle: 'italic', color: '#666' }}>
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {posts.map((post) => (
                        <li key={post.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '1rem' }}>
                            <p style={{ fontSize: '1.1rem' }}>{post.content}</p>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(post.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Profile;

