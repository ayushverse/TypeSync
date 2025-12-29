import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [hoveredOption, setHoveredOption] = useState(null);

    const menuOptions = [
        {
            id: 'solo',
            title: 'SOLO PRACTICE',
            subtitle: 'Practice typing and improve your WPM',
            path: '/solo'
        },
        {
            id: 'multiplayer',
            title: 'MULTIPLAYER RACE',
            subtitle: 'Compete with others in real-time',
            path: '/multiplayer'
        }
    ];

    return (
        <div className="home">
            <div className="home-container">
                <div className="home-title fade-in">
                    <h1 className="game-title">TYPESYNC</h1>
                    <p className="game-subtitle">MASTER YOUR TYPING SPEED</p>
                </div>

                <div className="menu-container">
                    {menuOptions.map((option, index) => (
                        <div
                            key={option.id}
                            className={`menu-item ${hoveredOption === option.id ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredOption(option.id)}
                            onMouseLeave={() => setHoveredOption(null)}
                            onClick={() => navigate(option.path)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="menu-item-title">{option.title}</div>
                            <div className="menu-item-subtitle">{option.subtitle}</div>
                        </div>
                    ))}
                </div>

                <div className="home-footer">
                    <p>Built for speed enthusiasts</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
