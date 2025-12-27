import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(express.json());

const rooms = new Map();
const playerRooms = new Map();

function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return rooms.has(code) ? generateRoomCode() : code;
}

function getRandomWords(count = 50) {
    const wordList = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
        'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
        'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
        'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
        'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
        'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
        'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
    ];

    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return words;
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('createRoom', ({ username }) => {
        const roomCode = generateRoomCode();
        const player = {
            id: socket.id,
            username,
            ready: false,
            progress: 0
        };

        rooms.set(roomCode, {
            code: roomCode,
            players: [player],
            gameStarted: false,
            words: []
        });

        playerRooms.set(socket.id, roomCode);
        socket.join(roomCode);

        socket.emit('roomCreated', {
            roomCode,
            players: [player]
        });

        console.log(`Room ${roomCode} created by ${username}`);
    });

    socket.on('joinRoom', ({ username, roomCode }) => {
        const room = rooms.get(roomCode);

        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }

        if (room.gameStarted) {
            socket.emit('error', { message: 'Game already in progress' });
            return;
        }

        if (room.players.length >= 10) {
            socket.emit('error', { message: 'Room is full' });
            return;
        }

        const player = {
            id: socket.id,
            username,
            ready: false,
            progress: 0
        };

        room.players.push(player);
        playerRooms.set(socket.id, roomCode);
        socket.join(roomCode);

        socket.emit('roomJoined', {
            roomCode,
            players: room.players
        });

        socket.to(roomCode).emit('playerJoined', {
            players: room.players
        });

        console.log(`${username} joined room ${roomCode}`);
    });

    socket.on('playerReady', () => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);

        if (!room) return;

        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.ready = true;
        }

        io.to(roomCode).emit('playerReady', {
            players: room.players
        });

        const allReady = room.players.every(p => p.ready) && room.players.length >= 2;

        if (allReady && !room.gameStarted) {
            room.gameStarted = true;
            room.words = getRandomWords(50);

            setTimeout(() => {
                io.to(roomCode).emit('gameStart', {
                    words: room.words,
                    startTime: Date.now()
                });
                console.log(`Game started in room ${roomCode}`);
            }, 3000);
        }
    });

    socket.on('updateProgress', ({ progress }) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);

        if (!room) return;

        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.progress = progress;
        }

        socket.to(roomCode).emit('playerProgress', {
            playerId: socket.id,
            progress
        });
    });

    socket.on('playerFinished', ({ wpm, accuracy, timeTaken }) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);

        if (!room) return;

        const player = room.players.find(p => p.id === socket.id);
        if (player) {
            player.finished = true;
            player.wpm = wpm;
            player.accuracy = accuracy;
            player.timeTaken = timeTaken;
            player.progress = 100;
        }

        io.to(roomCode).emit('playerProgress', {
            playerId: socket.id,
            progress: 100
        });

        const allFinished = room.players.every(p => p.finished);

        if (allFinished) {
            const sortedPlayers = [...room.players].sort((a, b) => b.wpm - a.wpm);

            io.to(roomCode).emit('gameEnd', {
                winner: sortedPlayers[0],
                results: sortedPlayers
            });

            console.log(`Game ended in room ${roomCode}, winner: ${sortedPlayers[0].username}`);
        }
    });

    socket.on('leaveRoom', () => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);

        if (!room) return;

        room.players = room.players.filter(p => p.id !== socket.id);
        playerRooms.delete(socket.id);
        socket.leave(roomCode);

        if (room.players.length === 0) {
            rooms.delete(roomCode);
            console.log(`Room ${roomCode} deleted (no players)`);
        } else {
            io.to(roomCode).emit('playerLeft', {
                players: room.players
            });
        }
    });

    socket.on('disconnect', () => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);

        if (room) {
            room.players = room.players.filter(p => p.id !== socket.id);
            playerRooms.delete(socket.id);

            if (room.players.length === 0) {
                rooms.delete(roomCode);
                console.log(`Room ${roomCode} deleted (no players)`);
            } else {
                io.to(roomCode).emit('playerLeft', {
                    players: room.players
                });
            }
        }

        console.log('User disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'typeSync Server Running',
        activeRooms: rooms.size,
        activePlayers: playerRooms.size
    });
});

const PORT = process.env.PORT || 5673;

httpServer.listen(PORT, () => {
    console.log(`🚀 typeSync server running on port ${PORT}`);
    console.log(`📡 WebSocket server ready for connections`);
});
