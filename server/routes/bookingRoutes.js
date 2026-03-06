const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const AvailabilityBlock = require('../models/AvailabilityBlock');
const TrainingSession = require('../models/TrainingSession');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('service').sort({ date: 1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, phone, date, service, notes } = req.body;

    try {
        const bookingDate = new Date(date);
        const bufferBefore = new Date(bookingDate.getTime() - 59 * 60 * 1000); // 59 mins before
        const bufferAfter = new Date(bookingDate.getTime() + 59 * 60 * 1000);  // 59 mins after

        // 1. Check existing Bookings (Confirmed or Pending)
        const existingBooking = await Booking.findOne({
            status: { $ne: 'rejected' },
            date: { $gt: bufferBefore, $lt: bufferAfter }
        });

        // 2. Check Training Sessions (Classes)
        // We assume classes are also 1 hour minimum for blocking, but we can check their specific duration
        const existingClass = await TrainingSession.findOne({
            date: { $gt: bufferBefore, $lt: bufferAfter }
        });

        // 3. Check Manual Blocks
        const existingBlock = await AvailabilityBlock.findOne({
            start: { $lt: bufferAfter },
            end: { $gt: bookingDate }
        });

        if (existingBooking || existingClass || existingBlock) {
            return res.status(400).json({
                message: 'This time slot overlaps with an existing appointment, class, or blocked time.'
            });
        }

        const booking = await Booking.create({
            name, email, phone, date, service, notes
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get availability (all booked and blocked slots)
// @route   GET /api/bookings/availability
// @access  Public
router.get('/availability', async (req, res) => {
    try {
        const bookings = await Booking.find({ status: { $ne: 'rejected' } }).populate('service');
        const blocks = await AvailabilityBlock.find({});
        const training = await TrainingSession.find({});

        // Format for FullCalendar or Frontend Consumption
        const events = [
            ...bookings.map(b => ({
                title: b.status === 'pending' ? 'Pending Request' : 'Booked',
                start: b.date,
                end: new Date(new Date(b.date).getTime() + 60 * 60 * 1000), // 1 hour default
                display: 'background',
                color: b.status === 'pending' ? '#fde047' : '#ff9f89' // Yellow for pending, Salmon for confirmed
            })),
            ...blocks.map(b => ({
                title: b.reason || 'Blocked',
                start: b.start,
                end: b.end,
                display: 'background',
                color: '#cccccc'
            })),
            ...training.map(t => ({
                title: t.title,
                start: t.date,
                end: new Date(new Date(t.date).getTime() + t.duration * 60 * 1000),
                color: '#e11d48'
            }))
        ];

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status || booking.status;
            const updated = await booking.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a booking (Admin only)
// @route   DELETE /api/bookings/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            await booking.deleteOne();
            res.json({ message: 'Booking removed' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
