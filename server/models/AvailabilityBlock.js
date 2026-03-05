const mongoose = require('mongoose');

const availabilityBlockSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        default: 'Unavailable'
    }
}, { timestamps: true });

module.exports = mongoose.model('AvailabilityBlock', availabilityBlockSchema);
