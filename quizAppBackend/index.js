const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require('./db');
const quizRouter = require('./routes/quizRoutes');
const { logRequests } = require('./middlewares/logger');
require('dotenv').config();
var cors = require('cors');
const leaderboardRouter = require('./routes/leaderboardRoutes');
const userRouter = require('./routes/userRoutes');
const attemptsRouter = require('./routes/attemptsRoutes');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))
app.use(express.json());
app.use(logRequests)

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use(cookieParser())
app.use("/quiz",quizRouter)
app.use("/leaderboard",leaderboardRouter)
app.use("/user",userRouter)
app.use("/attempt",attemptsRouter)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0' ,() => console.log(`🚀 Server running on port ${PORT}`));

