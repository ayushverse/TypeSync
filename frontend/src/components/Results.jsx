import React from 'react';
import './Results.css';

function Results({ results, onRetry, onChangeDuration, durations }) {
    const { wpm, accuracy, correctChars, totalChars, timeTaken, errors } = results;

    const getPerformanceMessage = () => {
        if (wpm >= 100) return { text: 'Incredible!', color: '#10b981' };
        if (wpm >= 80) return { text: 'Excellent!', color: '#8b5cf6' };
        if (wpm >= 60) return { text: 'Great Job!', color: '#06b6d4' };
        if (wpm >= 40) return { text: 'Good Progress!', color: '#f59e0b' };
        return { text: 'Keep Practicing!', color: '#ec4899' };
    };

    const performance = getPerformanceMessage();

    return (
        <div className="section-flat fade-in">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="results-header">
                    <h2 style={{ color: performance.color }}>{performance.text.toUpperCase()}</h2>
                    <p className="results-subtitle">RACE PERFORMANCE REPORT</p>
                </div>

                <div className="results-stats-flat">
                    <div className="result-stat-flat primary">
                        <div className="stat-content">
                            <div className="stat-value">{wpm}</div>
                            <div className="stat-label">WORDS PER MINUTE</div>
                        </div>
                    </div>

                    <div className="flex gap-md" style={{ marginBottom: '2rem' }}>
                        <div className="result-stat-flat flex-1">
                            <div className="stat-value">{accuracy}%</div>
                            <div className="stat-label">ACCURACY</div>
                        </div>
                        <div className="result-stat-flat flex-1">
                            <div className="stat-value">{timeTaken}s</div>
                            <div className="stat-label">TIME</div>
                        </div>
                    </div>

                    <div className="flex gap-md" style={{ marginBottom: '3rem' }}>
                        <div className="result-stat-flat flex-1">
                            <div className="stat-value">{correctChars}</div>
                            <div className="stat-label">CORRECT</div>
                        </div>
                        <div className="result-stat-flat flex-1">
                            <div className="stat-value">{errors}</div>
                            <div className="stat-label">ERRORS</div>
                        </div>
                    </div>
                </div>

                <div className="results-actions-flat">
                    <button className="btn btn-primary" onClick={onRetry} style={{ width: '100%', marginBottom: '2rem' }}>
                        RESTART RACE
                    </button>

                    {durations && (
                        <div className="duration-change-flat">
                            <p className="text-dim">FAST CHANGE DURATION:</p>
                            <div className="flex gap-sm justify-center">
                                {durations.map((d) => (
                                    <button
                                        key={d}
                                        className="btn btn-secondary"
                                        onClick={() => onChangeDuration(d)}
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        {d}S
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="results-tips-flat" style={{ marginTop: '4rem' }}>
                    <h4 className="text-dim">IMPROVEMENT STRATEGY</h4>
                    <ul className="flex-col gap-sm" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                        {accuracy < 95 && <li style={{ color: 'var(--accent-error)' }}>! Focus on accuracy before speed</li>}
                        {wpm < 60 && <li>+ Practice regularly to build muscle memory</li>}
                        {errors > 5 && <li>- Slow down and reduce errors</li>}
                        <li>+ Keep fingers on home row position</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Results;
