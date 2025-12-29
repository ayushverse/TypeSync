# typeSync

A multiplayer typing game inspired by MonkeyType. Practice your typing speed solo or compete with friends in real-time races!

![typeSync](https://img.shields.io/badge/typeSync-Multiplayer%20Typing%20Game-8b5cf6)

## Features

### Solo Mode
- Practice typing with multiple time options (15s, 30s, 60s, 120s)
- Real-time WPM and accuracy tracking
- Detailed statistics and performance feedback
- Character-level error highlighting
- Improvement tips based on performance

### Multiplayer Mode
- Real-time competitive races with up to 10 players
- Live progress tracking for all participants
- Room-based system with shareable codes
- Synchronized game start
- Instant winner determination

### Premium UI/UX
- Modern glassmorphism design
- Smooth animations and transitions
- Gradient color schemes
- Responsive layout for all devices
- Dark theme optimized for long sessions

## Tech Stack

**Frontend:**
- React 19 with Vite
- React Router for navigation
- Socket.IO Client for real-time communication
- Vanilla CSS with modern design patterns

**Backend:**
- Node.js with Express
- Socket.IO for WebSocket connections
- Room-based game management

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository** (or navigate to the project)
```bash
cd typeSync
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
npm install
```

### Running the Application

You need to run both the frontend and backend servers:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```
The server will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The app will run on `http://localhost:5173`

### Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Choose your game mode:
   - **Solo Practice**: Select duration and start typing
   - **Multiplayer Race**: Create or join a room with friends

## Game Controls

- **Start typing** - Game begins automatically
- **ESC** - Restart test (Solo mode)
- **Space** - Confirm word
- Focus on accuracy first, speed will follow!

## Project Structure

```
typeSync/
├── frontend/                # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Global styles
│   └── package.json
│
├── backend/                 # Backend (Node.js + Socket.IO)
│   ├── index.js            # Server entry point
│   └── package.json
│
└── README.md
```

## Key Features Explained

### Real-time Multiplayer
- WebSocket-based communication ensures low latency
- Room-based matchmaking with 6-character codes
- Live progress synchronization across all players
- Automatic game start when all players are ready

### Typing Mechanics
- Character-level accuracy tracking
- WPM calculated using standard formula (CPM / 5)
- Error highlighting for learning
- Smooth cursor animation

### Performance Tracking
- Real-time WPM and accuracy display
- Detailed post-game statistics
- Performance-based feedback messages
- Personalized improvement tips

## Future Enhancements

- [ ] User accounts and authentication
- [ ] Global leaderboards
- [ ] Daily challenges
- [ ] Custom word lists
- [ ] Tournament mode
- [ ] Practice statistics history
- [ ] Achievements and badges
- [ ] Mobile app version

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments

- Inspired by MonkeyType
- Built with modern web technologies
- Designed for typing enthusiasts

---

**Happy Typing!**

Made for the typing community
