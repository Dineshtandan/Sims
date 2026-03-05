const mongoose = require('mongoose');

const trainingSessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        default: 180 // in minutes
    },
    capacity: {
        type: Number,
        required: true
    },
    enrolled: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('TrainingSession', trainingSessionSchema);
