import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        api('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                if (!res.ok) throw new Error('Invalid credentials');
                return res.json();
            })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            })
            .catch(() => alert('Login failed. Check your username and password.'));
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: '#111',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    Log In
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Don’t have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
}

export default Login;


