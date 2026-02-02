import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Admin() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchAdminData = async () => {
            try {
                const [usersRes, statsRes] = await Promise.all([
                    fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${user.token}` } }),
                    fetch('/api/admin/stats', { headers: { 'Authorization': `Bearer ${user.token}` } })
                ]);
                const usersData = await usersRes.json();
                const statsData = await statsRes.json();
                setUsers(usersData);
                setStats(statsData);
                setLoading(false);
            } catch (error) {
                console.error('Admin fetch failed:', error);
                setLoading(false);
            }
        };
        fetchAdminData();
    }, [user, navigate]);

    if (loading) return <div className="text-center pulse" style={{ padding: '5rem' }}>LOADING SYSTEM DATA...</div>;

    return (
        <div className="section-flat" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
                    <h2 className="gradient-text">ADMIN SYSTEM</h2>
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>BACK HOME</button>
                </div>

                <div className="flex gap-lg" style={{ marginBottom: '3rem' }}>
                    <div className="card flex-1">
                        <div className="text-dim">TOTAL USERS</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats?.userCount}</div>
                    </div>
                    <div className="card flex-1">
                        <div className="text-dim">ADMINS</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats?.adminCount}</div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid rgba(255, 8, 68, 0.2)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>USER</th>
                                <th style={{ padding: '1rem' }}>EMAIL</th>
                                <th style={{ padding: '1rem' }}>ROLE</th>
                                <th style={{ padding: '1rem' }}>RACES</th>
                                <th style={{ padding: '1rem' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255, 8, 68, 0.1)' }}>
                                    <td style={{ padding: '1rem' }}>{u.username.toUpperCase()}</td>
                                    <td style={{ padding: '1rem' }}>{u.email}</td>
                                    <td style={{ padding: '1rem' }}>{u.role.toUpperCase()}</td>
                                    <td style={{ padding: '1rem' }}>{u.stats?.length || 0}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                                            MANAGE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;
