import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="section-flat" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                <h2 className="gradient-text" style={{ marginBottom: '2rem', textAlign: 'center' }}>LOGIN</h2>
                <form onSubmit={handleSubmit} className="flex-col gap-md">
                    <input
                        type="email"
                        placeholder="EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: 'var(--accent-error)', fontSize: '0.8rem' }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>ENTER SYSTEM</button>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        NEW USER? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>REGISTER</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
