import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="home-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="home-content container">
                <header className="home-header fade-in">
                    <div className="logo">
                        <span className="logo-icon"></span>
                        <span className="logo-text gradient-text">typeSync</span>
                    </div>
                    <p className="tagline">Master your typing speed in real-time races</p>
                </header>

                <div className="mode-selection">
                    <div className="mode-card solo-card slide-in" onClick={() => navigate('/solo')}>
                        <div className="mode-icon"></div>
                        <h2>Solo Practice</h2>
                        <p>Practice typing and improve your WPM</p>
                        <div className="mode-features">
                            <span>• Multiple time modes</span>
                            <span>• Detailed statistics</span>
                            <span>• Progress tracking</span>
                        </div>
                        <button className="btn btn-secondary">Start Practicing</button>
                    </div>

                    <div className="mode-card multiplayer-card slide-in" onClick={() => navigate('/multiplayer')}>
                        <div className="mode-icon"></div>
                        <h2>Multiplayer Race</h2>
                        <p>Compete with others in real-time</p>
                        <div className="mode-features">
                            <span>• Live competition</span>
                            <span>• Real-time leaderboard</span>
                            <span>• 2-10 players</span>
                        </div>
                        <button className="btn btn-primary glow">Join Race</button>
                    </div>
                </div>

                <div className="stats-preview fade-in">
                    <div className="stat-item">
                        <div className="stat-value gradient-text">150+</div>
                        <div className="stat-label">Average WPM</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value gradient-text">98%</div>
                        <div className="stat-label">Accuracy</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value gradient-text">5K+</div>
                        <div className="stat-label">Active Players</div>
                    </div>
                </div>

                <footer className="home-footer">
                    <p>Built for speed enthusiasts</p>
                </footer>
            </div>
        </div>
    );
}

export default Home;
