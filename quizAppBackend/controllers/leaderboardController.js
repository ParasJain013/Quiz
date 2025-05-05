const Leaderboard = require("../models/Leaderboard");

const saveToLeaderboard = async (name, subject, score) => {
    try {

        const existingEntry = await Leaderboard.findOne({ name, subject });

        const now = new Date();

        if (existingEntry) {
            const update = {
                latestScore: score,
                latestScoreDate: now,
                time: now,
            };

            if (score > existingEntry.highestScore) {
                update.highestScore = score;
                update.highestScoreDate = now;
            }

            await Leaderboard.updateOne({ name, subject }, { $set: update });
        } else {
            const newEntry = new Leaderboard({
                name,
                subject,
                latestScore: score,
                highestScore: score,
                latestScoreDate: now,
                highestScoreDate: now,
            });

            await newEntry.save();
        }
    } catch (error) {
        console.error('Internal Server Error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchLeaderboardData = async (req, res) => {
    try {
        const leaderboardDoc = await Leaderboard.find({});
        if (!leaderboardDoc) {
            res.status(200).json({ msg: 'No Data Found' })
        } else {
            res.status(200).json(leaderboardDoc)
        }
    } catch (error) {
        console.error('Error fetching Leaderboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { saveToLeaderboard, fetchLeaderboardData }