const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!uri) {
        console.error('FATAL: No MongoDB URI found in environment variables!');
        return;
    }

    try {
        mongoose.connection.on('error', err => {
            console.error(`Mongoose Runtime Connection Error: ${err.message}`);
        });

        console.log('Attempting to connect to MongoDB Atlas...');

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // Wait 10s for server selection
            socketTimeoutMS: 45000,
            family: 4, // Force IPv4 to avoid IPv6 resolution issues
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Initial Connection Error: ${error.message}`);
        console.error('Potential causes:');
        console.error('1. Your IP address might not be whitelisted in MongoDB Atlas.');
        console.error('2. Your ISP/Network might be blocking Port 27017 or DNS SRV records.');
        console.error('3. The credentials in your .env file might be incorrect.');
        // Do not exit process in serverless environment
    }
};

module.exports = connectDB;
