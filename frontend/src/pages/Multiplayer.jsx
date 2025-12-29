import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import MultiplayerRace from '../components/MultiplayerRace';
import './Multiplayer.css';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5673';

function Multiplayer() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [isInRoom, setIsInRoom] = useState(false);
    const [roomPlayers, setRoomPlayers] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameData, setGameData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            setError('');
        });

        newSocket.on('connect_error', () => {
            setError('Unable to connect to server. Make sure the server is running.');
        });

        newSocket.on('roomJoined', ({ roomCode, players }) => {
            setIsInRoom(true);
            setRoomCode(roomCode);
            setRoomPlayers(players);
            setError('');
        });

        newSocket.on('roomCreated', ({ roomCode, players }) => {
            setIsInRoom(true);
            setRoomCode(roomCode);
            setRoomPlayers(players);
            setError('');
        });

        newSocket.on('playerJoined', ({ players }) => {
            setRoomPlayers(players);
        });

        newSocket.on('playerLeft', ({ players }) => {
            setRoomPlayers(players);
        });

        newSocket.on('playerReady', ({ players }) => {
            setRoomPlayers(players);
        });

        newSocket.on('gameStart', ({ words, startTime }) => {
            setGameStarted(true);
            setGameData({ words, startTime });
        });

        newSocket.on('playerProgress', ({ playerId, progress }) => {
            setRoomPlayers(prev =>
                prev.map(p => p.id === playerId ? { ...p, progress } : p)
            );
        });

        newSocket.on('gameEnd', ({ winner, results }) => {
            console.log('Game ended', winner, results);
        });

        newSocket.on('error', ({ message }) => {
            setError(message);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleCreateRoom = () => {
        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }
        socket.emit('createRoom', { username: username.trim() });
    };

    const handleJoinRoom = () => {
        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }
        if (!roomCode.trim()) {
            setError('Please enter a room code');
            return;
        }
        socket.emit('joinRoom', { username: username.trim(), roomCode: roomCode.trim().toUpperCase() });
    };

    const handleReady = () => {
        socket.emit('playerReady');
        setIsReady(true);
    };

    const handleLeaveRoom = () => {
        socket.emit('leaveRoom');
        setIsInRoom(false);
        setIsReady(false);
        setGameStarted(false);
        setGameData(null);
        setRoomPlayers([]);
        setRoomCode('');
    };

    const handleProgressUpdate = (progress) => {
        socket.emit('updateProgress', { progress });
    };

    if (gameStarted && gameData) {
        return (
            <div className="multiplayer-page">
                <div className="container">
                    <MultiplayerRace
                        socket={socket}
                        gameData={gameData}
                        players={roomPlayers}
                        onProgressUpdate={handleProgressUpdate}
                        onComplete={() => setGameStarted(false)}
                    />
                </div>
            </div>
        );
    }

    if (isInRoom) {
        return (
            <div className="multiplayer-page">
                <div className="container">
                    <header className="multiplayer-header">
                        <button className="btn btn-secondary" onClick={handleLeaveRoom}>
                            ← Leave Room
                        </button>
                        <h1 className="gradient-text">Multiplayer Lobby</h1>
                        <div style={{ width: '120px' }}></div>
                    </header>

                    <div className="lobby-container fade-in">
                        <div className="lobby-card glass">
                            <div className="room-info">
                                <h2>Room Code</h2>
                                <div className="room-code-display">{roomCode}</div>
                                <p className="room-hint">Share this code with friends to join</p>
                            </div>

                            <div className="players-section">
                                <h3>Player ({roomPlayers.length}/10)</h3>
                                <div className="players-list">
                                    {roomPlayers.map((player) => (
                                        <div key={player.id} className="player-item">
                                            <div className="player-avatar">
                                                {player.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="player-info">
                                                <div className="player-name">{player.username}</div>
                                                <div className={`player-status ${player.ready ? 'ready' : ''}`}>
                                                    {player.ready ? '✓ Ready' : 'Not Ready'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {!isReady ? (
                                <button className="btn btn-primary glow" onClick={handleReady}>
                                    Ready Up
                                </button>
                            ) : (
                                <div className="waiting-message">
                                    <div className="pulse">⏳</div>
                                    <p>Waiting for other players...</p>
                                </div>
                            )}

                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="multiplayer-page">
            <div className="container">
                <header className="multiplayer-header">
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>
                        ← Back
                    </button>
                    <h1 className="gradient-text">Multiplayer</h1>
                    <div style={{ width: '100px' }}></div>
                </header>

                <div className="join-options fade-in">
                    <div className="option-card glass">
                        <div className="option-icon"></div>
                        <h2>Create Room</h2>
                        <p>Start a new game and invite friends</p>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={20}
                        />

                        <button className="btn btn-primary glow" onClick={handleCreateRoom}>
                            Create Room
                        </button>
                    </div>

                    <div className="option-card glass">
                        <div className="option-icon"></div>
                        <h2>Join Room</h2>
                        <p>Join an existing game with a code</p>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={20}
                        />

                        <input
                            type="text"
                            placeholder="Enter room code"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            maxLength={6}
                            style={{ marginTop: '1rem' }}
                        />

                        <button className="btn btn-primary" onClick={handleJoinRoom}>
                            Join Room
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-banner fade-in">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Multiplayer;
