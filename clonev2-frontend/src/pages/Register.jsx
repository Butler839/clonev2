import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({
        username: '',
        displayName: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Registration failed');
                return res.json();
            })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            })
            .catch(() => alert('Error: Could not register. Username or email might already exist.'));
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input name="username" placeholder="Username" required onChange={handleChange} style={inputStyle} />
                <input name="displayName" placeholder="Display Name" required onChange={handleChange} style={inputStyle} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} style={inputStyle} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} style={inputStyle} />
                <button type="submit" style={buttonStyle}>Sign Up</button>
            </form>
        </div>
    );
}

const inputStyle = { width: '100%', padding: '0.6rem', marginBottom: '1rem' };
const buttonStyle = {
    background: '#111',
    color: 'white',
    padding: '0.7rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
};

export default Register;
