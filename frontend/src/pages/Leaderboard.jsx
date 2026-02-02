import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await fetch('/api/stats/leaderboard');
                const data = await response.json();
                setLeaders(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    return (
        <div className="section-flat" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
                    <h2 className="gradient-text">GLOBAL RANKINGS</h2>
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>BACK HOME</button>
                </div>

                {loading ? (
                    <div className="text-center pulse">LOADING TOP TYPISTS...</div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(255, 8, 68, 0.2)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>RANK</th>
                                    <th style={{ padding: '1rem' }}>PLAYER</th>
                                    <th style={{ padding: '1rem' }}>BEST WPM</th>
                                    <th style={{ padding: '1rem' }}>ACCURACY</th>
                                    <th style={{ padding: '1rem' }}>TOTAL RACES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaders.map((leader, index) => (
                                    <tr
                                        key={leader._id}
                                        className="card"
                                        style={{
                                            borderBottom: '1px solid rgba(255, 8, 68, 0.1)',
                                            background: index === 0 ? 'rgba(255, 8, 68, 0.1)' : 'transparent'
                                        }}
                                    >
                                        <td style={{ padding: '1.5rem', fontWeight: 'bold' }}>#{index + 1}</td>
                                        <td style={{ padding: '1.5rem', color: index === 0 ? 'var(--accent-primary)' : 'inherit' }}>
                                            {leader.username.toUpperCase()}
                                        </td>
                                        <td style={{ padding: '1.5rem' }}>{Math.round(leader.bestWpm)} WPM</td>
                                        <td style={{ padding: '1.5rem' }}>{Math.round(leader.avgAccuracy)}%</td>
                                        <td style={{ padding: '1.5rem' }}>{leader.totalRaces}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Leaderboard;
