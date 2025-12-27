import React from 'react';
import './Results.css';

function Results({ results, onRetry, onChangeDuration, durations }) {
    const { wpm, accuracy, correctChars, totalChars, timeTaken, errors } = results;

    const getPerformanceMessage = () => {
        if (wpm >= 100) return { text: '🔥 Incredible!', color: '#10b981' };
        if (wpm >= 80) return { text: '⚡ Excellent!', color: '#8b5cf6' };
        if (wpm >= 60) return { text: '👍 Great Job!', color: '#06b6d4' };
        if (wpm >= 40) return { text: '📈 Good Progress!', color: '#f59e0b' };
        return { text: '💪 Keep Practicing!', color: '#ec4899' };
    };

    const performance = getPerformanceMessage();

    return (
        <div className="results-container fade-in">
            <div className="results-card glass">
                <div className="results-header">
                    <h2 style={{ color: performance.color }}>{performance.text}</h2>
                    <p className="results-subtitle">Test Complete</p>
                </div>

                <div className="results-stats">
                    <div className="result-stat primary">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value gradient-text">{wpm}</div>
                            <div className="stat-label">Words Per Minute</div>
                        </div>
                    </div>

                    <div className="result-stat">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-content">
                            <div className="stat-value">{accuracy}%</div>
                            <div className="stat-label">Accuracy</div>
                        </div>
                    </div>

                    <div className="result-stat">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                            <div className="stat-value">{timeTaken}s</div>
                            <div className="stat-label">Time Taken</div>
                        </div>
                    </div>

                    <div className="result-stat">
                        <div className="stat-icon">✓</div>
                        <div className="stat-content">
                            <div className="stat-value">{correctChars}</div>
                            <div className="stat-label">Correct Characters</div>
                        </div>
                    </div>

                    <div className="result-stat">
                        <div className="stat-icon">❌</div>
                        <div className="stat-content">
                            <div className="stat-value">{errors}</div>
                            <div className="stat-label">Errors</div>
                        </div>
                    </div>

                    <div className="result-stat">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <div className="stat-value">{totalChars}</div>
                            <div className="stat-label">Total Characters</div>
                        </div>
                    </div>
                </div>

                <div className="results-actions">
                    <button className="btn btn-primary glow" onClick={onRetry}>
                        ↻ Try Again
                    </button>

                    {durations && (
                        <div className="duration-change">
                            <p>Try different duration:</p>
                            <div className="duration-options">
                                {durations.map((d) => (
                                    <button
                                        key={d}
                                        className="btn btn-secondary"
                                        onClick={() => onChangeDuration(d)}
                                    >
                                        {d}s
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="results-tips">
                    <h4>💡 Tips to Improve</h4>
                    <ul>
                        {accuracy < 95 && <li>Focus on accuracy before speed</li>}
                        {wpm < 60 && <li>Practice regularly to build muscle memory</li>}
                        {errors > 5 && <li>Slow down and reduce errors</li>}
                        <li>Keep your fingers on home row position</li>
                        <li>Look at the screen, not your keyboard</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Results;
