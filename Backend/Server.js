const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// App initialization
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,)
.then(() => {
    console.log('✅ Connected to MongoDB');
    // Start server after DB connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on PORT:${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
});
