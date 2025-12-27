import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingTest from '../components/TypingTest';
import Results from '../components/Results';
import './Solo.css';

function Solo() {
    const navigate = useNavigate();
    const [duration, setDuration] = useState(60);
    const [results, setResults] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);

    const durations = [15, 30, 60, 120];

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
                <header className="solo-header">
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>
                        ← Back
                    </button>
                    <h1 className="gradient-text">Solo Practice</h1>
                    <div style={{ width: '100px' }}></div>
                </header>

                {!results && !isTestActive && (
                    <div className="test-config fade-in">
                        <h3>Select Duration</h3>
                        <div className="duration-selector">
                            {durations.map((d) => (
                                <button
                                    key={d}
                                    className={`duration-btn ${duration === d ? 'active' : ''}`}
                                    onClick={() => setDuration(d)}
                                >
                                    {d}s
                                </button>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary glow"
                            onClick={() => setIsTestActive(true)}
                        >
                            Start Test
                        </button>
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
