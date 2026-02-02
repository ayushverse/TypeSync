import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Solo from './pages/Solo';
import Multiplayer from './pages/Multiplayer';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import Tournaments from './pages/Tournaments';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/solo" element={<Solo />} />
                        <Route path="/multiplayer" element={<Multiplayer />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/tournaments" element={<Tournaments />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;