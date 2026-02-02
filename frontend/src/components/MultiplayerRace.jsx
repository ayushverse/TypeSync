import React, { useState, useEffect, useRef } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/calculate.js';
import './MultiplayerRace.css';

function MultiplayerRace({ socket, gameData, players, onProgressUpdate, onComplete }) {
    const { words } = gameData;
    const [currentInput, setCurrentInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const [errors, setErrors] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setStartTime(Date.now());
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (currentWordIndex > 0) {
            const progress = (currentWordIndex / words.length) * 100;
            onProgressUpdate(progress);
        }
    }, [currentWordIndex]);

    const handleInputChange = (e) => {
        if (isFinished) return;

        const value = e.target.value;
        setCurrentInput(value);

        const currentWord = words[currentWordIndex];

        if (value.endsWith(' ')) {
            const typedWord = value.trim();
            const isCorrect = typedWord === currentWord;

            if (!isCorrect) {
                setErrors([...errors, currentWordIndex]);
            }

            setTotalChars(totalChars + currentWord.length + 1);
            setCorrectChars(correctChars + (isCorrect ? currentWord.length + 1 : 0));
            setCurrentWordIndex(currentWordIndex + 1);
            setCurrentCharIndex(0);
            setCurrentInput('');

            if (currentWordIndex >= words.length - 1) {
                finishRace();
            }
        } else {
            setCurrentCharIndex(value.length);
        }
    };

    const finishRace = () => {
        setIsFinished(true);
        const timeTaken = (Date.now() - startTime) / 1000;
        const wpm = calculateWPM(correctChars, timeTaken);
        const accuracy = calculateAccuracy(correctChars, totalChars);

        socket.emit('playerFinished', {
            wpm,
            accuracy,
            timeTaken
        });
    };

    const getCharClass = (wordIndex, charIndex) => {
        if (wordIndex < currentWordIndex) {
            const wasCorrect = !errors.includes(wordIndex);
            return wasCorrect ? 'char-correct' : 'char-error';
        }

        if (wordIndex === currentWordIndex) {
            if (charIndex < currentCharIndex) {
                const isCorrect = currentInput[charIndex] === words[wordIndex][charIndex];
                return isCorrect ? 'char-correct' : 'char-error';
            }
            if (charIndex === currentCharIndex) {
                return 'char-cursor';
            }
        }

        return '';
    };

    const timeTaken = startTime ? (Date.now() - startTime) / 1000 : 0;
    const currentWPM = calculateWPM(correctChars, timeTaken);
    const currentAccuracy = calculateAccuracy(correctChars, totalChars);

    return (
        <div className="multiplayer-race">
            <div className="race-header">
                <h2 className="gradient-text">Live Race</h2>
                <div className="race-stats">
                    <div className="stat">
                        <span className="stat-value">{currentWPM}</span>
                        <span className="stat-label">WPM</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">{currentAccuracy}%</span>
                        <span className="stat-label">Accuracy</span>
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={onComplete}>
                    ← Leave Race
                </button>
            </div>

            <div className="progress-bars">
                {players.map((player) => (
                    <div key={player.id} className="player-progress">
                        <div className="player-name-tag">
                            <div className="player-avatar-small">
                                {player.username.charAt(0).toUpperCase()}
                            </div>
                            <span>{player.username}</span>
                            {player.progress >= 100 && <span className="finish-badge">🏁</span>}
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${player.progress || 0}%` }}
                            />
                        </div>
                        <span className="progress-percent">{Math.round(player.progress || 0)}%</span>
                    </div>
                ))}
            </div>

            <div className="words-display-race">
                {words.slice(0, 50).map((word, wordIndex) => (
                    <div
                        key={wordIndex}
                        className={`word ${wordIndex === currentWordIndex ? 'word-active' : ''} ${errors.includes(wordIndex) ? 'word-error' : ''
                            }`}
                    >
                        {word.split('').map((char, charIndex) => (
                            <span
                                key={charIndex}
                                className={`char ${getCharClass(wordIndex, charIndex)}`}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                className="typing-input"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                disabled={isFinished}
            />

            {isFinished && (
                <div className="section-flat fade-in" style={{ marginTop: '3rem' }}>
                    <div className="results-header">
                        <h2 className="gradient-text">RACE FINISHED</h2>
                        <p className="results-subtitle">PERFORMANCE REPORT LOGGED</p>
                    </div>

                    <div className="results-stats-flat">
                        <div className="flex gap-md">
                            <div className="result-stat-flat flex-1 primary">
                                <div className="stat-value">{currentWPM}</div>
                                <div className="stat-label">WORDS PER MINUTE</div>
                            </div>
                            <div className="result-stat-flat flex-1 primary">
                                <div className="stat-value">{currentAccuracy}%</div>
                                <div className="stat-label">ACCURACY</div>
                            </div>
                        </div>
                    </div>

                    <p style={{ marginBottom: '2rem', color: 'var(--text-dim)' }}>Great job! Your results have been recorded in the global system.</p>

                    <button className="btn btn-primary" onClick={onComplete} style={{ width: '100%' }}>
                        RETURN TO LOBBY
                    </button>
                </div>
            )}
        </div>
    );
}

export default MultiplayerRace;
