import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingTest from '../components/TypingTest';
import Results from '../components/Results';
import './Solo.css';

function Solo() {
    const navigate = useNavigate();
    const [duration, setDuration] = useState(60);
    const [results, setResults] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);
    const [hoveredDuration, setHoveredDuration] = useState(null);

    const durations = [15, 30, 60, 120];

    // Audio setup
    useEffect(() => {
        const initAudio = () => {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            document.removeEventListener('click', initAudio);
        };
        document.addEventListener('click', initAudio);
        return () => document.removeEventListener('click', initAudio);
    }, []);

    const playHoverSound = () => {
        if (!window.audioContext) return;
        const oscillator = window.audioContext.createOscillator();
        const gainNode = window.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(window.audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);
        oscillator.start(window.audioContext.currentTime);
        oscillator.stop(window.audioContext.currentTime + 0.1);
    };

    const playClickSound = () => {
        if (!window.audioContext) return;
        const oscillator = window.audioContext.createOscillator();
        const gainNode = window.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(window.audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.15, window.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.15);
        oscillator.start(window.audioContext.currentTime);
        oscillator.stop(window.audioContext.currentTime + 0.15);
    };

    const handleDurationSelect = (d) => {
        setDuration(d);
        playClickSound();
        setTimeout(() => setIsTestActive(true), 100);
    };

    const handleTestComplete = (testResults) => {
        setResults(testResults);
        setIsTestActive(false);
    };

    const handleRetry = () => {
        setResults(null);
        setIsTestActive(true);
    };

    const handleChangeDuration = (newDuration) => {
        setDuration(newDuration);
        setResults(null);
        setIsTestActive(false);
    };

    return (
        <div className="solo-page">
            <div className="container">
                {!results && !isTestActive && (
                    <div className="solo-menu-container">
                        <div className="solo-title">
                            <button className="back-btn" onClick={() => navigate('/')}>
                                ← BACK
                            </button>
                            <h1 className="menu-title">SOLO PRACTICE</h1>
                            <p className="menu-subtitle">SELECT TIME LIMIT</p>
                        </div>

                        <div className="duration-menu">
                            {durations.map((d, index) => (
                                <div
                                    key={d}
                                    className={`duration-menu-item ${hoveredDuration === d ? 'active' : ''}`}
                                    onMouseEnter={() => {
                                        setHoveredDuration(d);
                                        playHoverSound();
                                    }}
                                    onMouseLeave={() => setHoveredDuration(null)}
                                    onClick={() => handleDurationSelect(d)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="duration-menu-title">{d} SECONDS</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isTestActive && !results && (
                    <div className="test-container fade-in">
                        <TypingTest
                            duration={duration}
                            onComplete={handleTestComplete}
                            showTimer={true}
                        />
                    </div>
                )}

                {results && (
                    <Results
                        results={results}
                        onRetry={handleRetry}
                        onChangeDuration={handleChangeDuration}
                        durations={durations}
                    />
                )}
            </div>
        </div>
    );
}

export default Solo;
