const express = require('express');
require('dotenv').config();  // Ensure dotenv is imported here
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

// const cors = require('cors');
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// Routes
const passport = require('passport');
app.use(passport.initialize());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
