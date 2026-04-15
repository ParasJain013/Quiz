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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
  
    try {
      // Get total count
      const totalCount = await Leaderboard.countDocuments();
  
      //paginated, sorted results
      const leaderboardDoc = await Leaderboard.find({})
        .sort({ highestScore: -1, highestScoreDate: -1 }) // first by score, then by time
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        data: leaderboardDoc,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount
      });
    } catch (error) {
      console.error('Error fetching Leaderboard:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { saveToLeaderboard, fetchLeaderboardData }