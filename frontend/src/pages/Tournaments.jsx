import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch('/api/tournaments');
                const data = await response.json();
                setTournaments(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch tournaments:', error);
                setLoading(false);
            }
        };
        fetchTournaments();
    }, []);

    const handleJoin = async (id) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('/api/tournaments/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ tournamentId: id })
            });
            const data = await response.json();
            if (response.ok) {
                alert('SUCCESSFULLY JOINED TOURNAMENT!');
                // Refresh data
                const updatedResponse = await fetch('/api/tournaments');
                const updatedData = await updatedResponse.json();
                setTournaments(updatedData);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Join failed:', error);
        }
    };

    return (
        <div className="section-flat" style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
            <div className="container">
                <div className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
                    <h2 className="gradient-text">ACTIVE TOURNAMENTS</h2>
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>BACK HOME</button>
                </div>

                {loading ? (
                    <div className="text-center pulse">SCANNING FOR COMPETITIONS...</div>
                ) : (
                    <div className="flex-col gap-lg">
                        {tournaments.map(t => (
                            <div key={t.id} className="card flex justify-between items-center" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                                <div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{t.title}</h3>
                                    <p className="text-dim" style={{ fontSize: '0.9rem' }}>STARTS AT: {new Date(t.startsAt).toLocaleString()}</p>
                                    <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginTop: '1rem' }}>PRIZE: {t.prize}</p>
                                </div>
                                <div className="text-center">
                                    <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{t.participants.length} PARTICIPANTS</div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleJoin(t.id)}
                                        disabled={user && t.participants.includes(user.username)}
                                    >
                                        {user && t.participants.includes(user.username) ? 'ALREADY JOINED' : 'JOIN RACE'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tournaments;
