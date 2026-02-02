import User from '../models/User.js';

export const getLeaderboard = async (req, res) => {
    try {
        // Aggregate users to find their highest WPM and return top 10
        const leaderboard = await User.aggregate([
            { $unwind: "$stats" },
            {
                $group: {
                    _id: "$_id",
                    username: { $first: "$username" },
                    bestWpm: { $max: "$stats.wpm" },
                    avgAccuracy: { $avg: "$stats.accuracy" },
                    totalRaces: { $sum: 1 }
                }
            },
            { $sort: { bestWpm: -1 } },
            { $limit: 10 }
        ]);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStats = async (req, res) => {
    try {
        const { wpm, accuracy, timeTaken, mode } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            user.stats.push({ wpm, accuracy, timeTaken, mode });
            await user.save();
            res.status(201).json({ message: 'Stats updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
