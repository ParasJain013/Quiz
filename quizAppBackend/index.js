const express = require('express');
const connectDB = require('./db');
const quizRouter = require('./routes/quizRoutes');
const { logRequests } = require('./middlewares/logger');
require('dotenv').config();
var cors = require('cors');
const leaderboardRouter = require('./routes/leaderboardRoutes');
const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(logRequests)
// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/quiz",quizRouter)
app.use("/leaderboard",leaderboardRouter)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// Private Key=78e399e2-737a-43f4-84b0-29e8f43c172b

// Public Key=lysaqiwy


// pass-7aMqbLdDdhrgZFBu

// username-parasjainpj013

// Mkarsp13

// mongodb+srv://paras:<db_password>@cluster-quiz.oiju6ti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-quiz