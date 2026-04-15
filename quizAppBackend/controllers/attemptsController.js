const Attempts = require("../models/Attempts"); 

const addToPrevAttempts = async (email, subject, stats) => {
  try {
    const user = await Attempts.findOne({ email });
    const time = new Date()
    const newAttempt = { subject, stats, time };

    if (user) {
      user.prevAttempts.push(newAttempt);

      // Keep only the latest 10
      if (user.prevAttempts.length > 10) {
        user.prevAttempts = user.prevAttempts.slice(-10);
      }

      await user.save();
    } else {
      const newUser = new Attempts({
        email,
        prevAttempts: [newAttempt]
      });

      await newUser.save();
    }
  } catch (error) {
    console.error("Error updating previous attempts:", error);
    throw error;
  }
};

const getPrevAttempts = async (req, res) => {
  try {
    const email = req.user.email;
    const data = await Attempts.findOne({email});

    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
  }
}
module.exports = { addToPrevAttempts, getPrevAttempts };
