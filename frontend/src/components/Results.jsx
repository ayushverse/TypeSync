import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import './Results.css';

function Results({ results, onRetry, onChangeDuration, durations }) {
    const { wpm, accuracy, correctChars, totalChars, timeTaken, errors, wpmHistory } = results;

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

                {wpmHistory && wpmHistory.length > 0 && (
                    <div className="wpm-graph-container" style={{
                        marginTop: '2rem',
                        marginBottom: '4rem',
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <h4 className="text-dim" style={{ marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '2px' }}>WPM OVER TIME</h4>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={wpmHistory}>
                                    <defs>
                                        <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                    <XAxis
                                        dataKey="time"
                                        stroke="rgba(255,255,255,0.5)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        label={{ value: 'Seconds', position: 'insideBottomRight', offset: -5, fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.5)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 'auto']}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1a1a1a',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                        itemStyle={{ color: 'var(--accent-primary)' }}
                                        cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="wpm"
                                        stroke="var(--accent-primary)"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorWpm)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

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
