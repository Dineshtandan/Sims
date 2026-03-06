const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
const result = dotenv.config({ override: true });
if (result.error) {
    console.warn("Dotenv warning:", result.error.message);
}

// DNS Fix for SRV ECONNREFUSED (Atlas)
const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    console.log('DNS servers set to Google/Cloudflare for Atlas SRV resolution');
} catch (e) {
    console.warn('Could not set custom DNS servers:', e.message);
}

// Log MONGODB_URI (masking password)
const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (dbUri) {
    const maskedURI = dbUri.replace(/:([^@]+)@/, ':****@');
    console.log(`Using DB URI: ${maskedURI}`);
} else {
    console.warn('DB URI (MONGODB_URI) is not defined in environment variables!');
}

// Global Error Handlers
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    // Do not exit in production/serverless
});

process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    // Do not exit in production/serverless
});

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
        console.log('Server Version: 2.2 (DNS & Resilience Fix)');
    });
}

module.exports = app;
