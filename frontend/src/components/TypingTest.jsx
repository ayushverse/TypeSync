import React, { useState, useEffect, useRef } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/calculate.js';
import { getRandomWords } from '../utils/wordGenerator.js';
import './TypingTest.css';

function TypingTest({ duration = 60, onComplete, showTimer = true }) {
    const [words, setWords] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [totalChars, setTotalChars] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [errors, setErrors] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        resetTest();
    }, [duration]);

    useEffect(() => {
        if (isStarted && !isFinished && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        finishTest();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isStarted, isFinished, timeLeft]);

    // Continuously add more words to ensure infinite words until timer ends
    useEffect(() => {
        if (isStarted && !isFinished && currentWordIndex > words.length - 30) {
            setWords(prevWords => [...prevWords, ...getRandomWords(50)]);
        }
    }, [currentWordIndex, isStarted, isFinished]);

    const resetTest = () => {
        const newWords = getRandomWords(200);
        setWords(newWords);
        setCurrentInput('');
        setCurrentWordIndex(0);
        setCurrentCharIndex(0);
        setCorrectChars(0);
        setTotalChars(0);
        setTimeLeft(duration);
        setIsStarted(false);
        setIsFinished(false);
        setErrors([]);
        inputRef.current?.focus();
    };

    const finishTest = () => {
        setIsFinished(true);
        const timeTaken = duration - timeLeft;
        const wpm = calculateWPM(correctChars, timeTaken);
        const accuracy = calculateAccuracy(correctChars, totalChars);

        if (onComplete) {
            onComplete({
                wpm,
                accuracy,
                correctChars,
                totalChars,
                timeTaken,
                errors: errors.length
            });
        }
    };

    const handleInputChange = (e) => {
        if (!isStarted) setIsStarted(true);
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
        } else {
            setCurrentCharIndex(value.length);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            resetTest();
        }
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

    const currentWPM = calculateWPM(correctChars, duration - timeLeft);
    const currentAccuracy = calculateAccuracy(correctChars, totalChars);

    return (
        <div className="typing-test">
            {!isFinished && (
                <>
                    <div className="test-header">
                        {showTimer && (
                            <div className="timer">
                                <span className="timer-value">{timeLeft}</span>
                                <span className="timer-label">seconds</span>
                            </div>
                        )}

                        <div className="live-stats">
                            <div className="stat">
                                <span className="stat-value gradient-text">{currentWPM}</span>
                                <span className="stat-label">WPM</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value gradient-text">{currentAccuracy}%</span>
                                <span className="stat-label">Accuracy</span>
                            </div>
                        </div>

                        <button className="btn btn-secondary" onClick={resetTest}>
                            ↻ Restart
                        </button>
                    </div>

                    <div className="words-display">
                        {words.slice(currentWordIndex, currentWordIndex + 50).map((word, wordIndex) => (
                            <div
                                key={currentWordIndex + wordIndex}
                                className={`word ${wordIndex === 0 ? 'word-active' : ''} ${errors.includes(currentWordIndex + wordIndex) ? 'word-error' : ''
                                    }`}
                            >
                                {word.split('').map((char, charIndex) => (
                                    <span
                                        key={charIndex}
                                        className={`char ${getCharClass(currentWordIndex + wordIndex, charIndex)}`}
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
                        onKeyDown={handleKeyDown}
                        className="typing-input"
                        placeholder={isStarted ? '' : 'Start typing to begin...'}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                    />

                    <div className="test-hint">
                        Press <kbd>ESC</kbd> to restart • Focus on accuracy first
                    </div>
                </>
            )}
        </div>
    );
}

export default TypingTest;
