const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const TrainingSession = require('./models/TrainingSession');

async function debugDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB:', process.env.MONGO_URI);

        const services = await Service.find({});
        console.log(`Found ${services.length} services:`);
        services.forEach(s => console.log(`- ${s.name} ($${s.price})`));

        const sessions = await TrainingSession.find({});
        console.log(`\nFound ${sessions.length} training sessions:`);
        sessions.forEach(s => console.log(`- ${s.title} ($${s.price}, date: ${s.date})`));

        // Simulate availability endpoint logic
        const bookings = await (require('./models/Booking')).find({ status: { $ne: 'cancelled' } }).populate('service');
        const AvailabilityBlock = require('./models/AvailabilityBlock');
        const blocks = await AvailabilityBlock.find({});

        console.log(`\nAvailability Check:`);
        console.log(`- Bookings: ${bookings.length}`);
        console.log(`- Blocks: ${blocks.length}`);
        console.log(`- Training: ${sessions.length}`);

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

debugDB();
