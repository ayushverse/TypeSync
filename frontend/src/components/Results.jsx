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
        <div className="section-flat fade-in" style={{ padding: '4rem 2rem' }}>
            <div className="results-container">
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

                    <div className="flex gap-xl" style={{ marginBottom: '4rem' }}>
                        <div className="result-stat-flat flex-1">
                            <div className="stat-value">{accuracy}%</div>
                            <div className="stat-label">ACCURACY</div>
                        </div>
                        <div className="result-stat-flat flex-1">
                            <div className="stat-value">{timeTaken}s</div>
                            <div className="stat-label">TIME</div>
                        </div>
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
                    <div className="wpm-graph-container">
                        <h4 className="text-dim" style={{ marginBottom: '2rem', fontSize: '0.9rem', letterSpacing: '3px', fontWeight: 'bold' }}>WPM OVER TIME</h4>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={wpmHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="time"
                                        stroke="rgba(255,255,255,0.3)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ dy: 10 }}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.3)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 'auto']}
                                        tick={{ dx: -10 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(20, 20, 20, 0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '4px',
                                            padding: '1rem',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}
                                        cursor={{ stroke: 'var(--accent-primary)', strokeWidth: 1, strokeDasharray: '5 5' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="wpm"
                                        stroke="var(--accent-primary)"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorWpm)"
                                        animationDuration={2000}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--accent-primary)' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                <div className="results-actions-flat">
                    <button className="btn btn-primary" onClick={onRetry} style={{ padding: '1.5rem 4rem', fontSize: '1.2rem', marginBottom: '3rem' }}>
                        RESTART RACE
                    </button>

                    {durations && (
                        <div className="duration-change-flat">
                            <p className="text-dim">CHANGE DURATION</p>
                            <div className="flex gap-md justify-center">
                                {durations.map((d) => (
                                    <button
                                        key={d}
                                        className="btn btn-secondary"
                                        onClick={() => onChangeDuration(d)}
                                        style={{ padding: '1rem 2rem', fontSize: '1rem' }}
                                    >
                                        {d}S
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="results-tips-flat">
                    <h4 className="text-dim">IMPROVEMENT STRATEGY</h4>
                    <ul className="flex-col gap-md" style={{ listStyle: 'none', padding: 0 }}>
                        {accuracy < 95 && <li style={{ color: 'var(--accent-error)', fontWeight: 'bold' }}>! Focus on accuracy before speed</li>}
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
