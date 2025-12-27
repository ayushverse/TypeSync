import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Solo from './pages/Solo';
import Multiplayer from './pages/Multiplayer';
import './index.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/solo" element={<Solo />} />
                    <Route path="/multiplayer" element={<Multiplayer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;