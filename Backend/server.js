const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/job', require('./routes/jobRoutes'));
// app.use('/api/viewJobs', require('./routes/viewJobRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
