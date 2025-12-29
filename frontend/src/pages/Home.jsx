import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [hoveredOption, setHoveredOption] = useState(null);

    // Create audio context for sound effects
    useEffect(() => {
        // Initialize on first user interaction to comply with browser autoplay policies
        const initAudio = () => {
            if (!window.audioContext) {
                window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            document.removeEventListener('mousemove', initAudio);
            document.removeEventListener('click', initAudio);
        };
        document.addEventListener('mousemove', initAudio, { once: true });
        document.addEventListener('click', initAudio, { once: true });
        return () => {
            document.removeEventListener('mousemove', initAudio);
            document.removeEventListener('click', initAudio);
        };
    }, []);

    // Play hover sound (UI beep like GTA)
    const playHoverSound = () => {
        if (!window.audioContext) return;

        const oscillator = window.audioContext.createOscillator();
        const gainNode = window.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(window.audioContext.destination);

        // UI beep sound - short and subtle
        oscillator.frequency.value = 800; // Hz
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);

        oscillator.start(window.audioContext.currentTime);
        oscillator.stop(window.audioContext.currentTime + 0.1);
    };

    // Play click sound (deeper confirmation beep)
    const playClickSound = () => {
        if (!window.audioContext) return;

        const oscillator = window.audioContext.createOscillator();
        const gainNode = window.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(window.audioContext.destination);

        // Deeper confirmation sound
        oscillator.frequency.value = 600; // Hz
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, window.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.15);

        oscillator.start(window.audioContext.currentTime);
        oscillator.stop(window.audioContext.currentTime + 0.15);
    };

    const handleHover = (optionId) => {
        setHoveredOption(optionId);
        playHoverSound();
    };

    const handleClick = (path) => {
        playClickSound();
        setTimeout(() => navigate(path), 100);
    };

    const menuOptions = [
        {
            id: 'solo',
            title: 'SOLO PRACTICE',
            subtitle: 'Practice typing and improve your WPM',
            path: '/solo'
        },
        {
            id: 'multiplayer',
            title: 'MULTIPLAYER',
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
                            onMouseEnter={() => handleHover(option.id)}
                            onMouseLeave={() => setHoveredOption(null)}
                            onClick={() => handleClick(option.path)}
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
