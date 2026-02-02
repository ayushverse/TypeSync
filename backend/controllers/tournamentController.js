import User from '../models/User.js';

// Mock tournament storage - would be a collection in a real app
let tournaments = [
    {
        id: 'T1',
        title: 'FRIDAY NIGHT SPEED',
        startsAt: new Date(Date.now() + 86400000).toISOString(),
        participants: [],
        prize: '1000 SYNC POINTS'
    }
];

export const getTournaments = (req, res) => {
    res.json(tournaments);
};

export const joinTournament = (req, res) => {
    const { tournamentId } = req.body;
    const tournament = tournaments.find(t => t.id === tournamentId);

    if (tournament) {
        if (!tournament.participants.includes(req.user.username)) {
            tournament.participants.push(req.user.username);
            res.json({ message: 'Joined tournament', tournament });
        } else {
            res.status(400).json({ message: 'Already joined' });
        }
    } else {
        res.status(404).json({ message: 'Tournament not found' });
    }
};
