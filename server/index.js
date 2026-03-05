const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const allowedOrigins = [
    'http://localhost:5173',        // Vite dev server
    'http://localhost:4173',        // Vite preview
    process.env.FRONTEND_URL,       // Set in Vercel environment variables
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (curl, Postman, server-to-server)
        if (!origin) return callback(null, true);
        // Allow any vercel.app subdomain
        if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Define routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/training-sessions', require('./routes/trainingRoutes'));
app.use('/api/availability', require('./routes/availabilityRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

app.get('/api/test-route', (req, res) => {
    res.json({ message: 'Test route works' });
});

const { ADMIN_EMAIL } = require('./config/adminConfig');

// Root route for API health check
app.get('/', (req, res) => {
    res.send(`API is running... Admin: ${ADMIN_EMAIL} (v2.1)`);
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        console.log('Server Version: 2.0 (Robust File-Based Auth)');
    });
}

module.exports = app;
