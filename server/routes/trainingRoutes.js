const express = require('express');
const router = express.Router();
const TrainingSession = require('../models/TrainingSession');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all training sessions
// @route   GET /api/training-sessions
// @access  Public
router.get('/', async (req, res) => {
    try {
        const sessions = await TrainingSession.find({}).sort({ date: 1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a training session
// @route   POST /api/training-sessions
// @access  Private
router.post('/', protect, async (req, res) => {
    const { title, date, price, duration, capacity } = req.body;

    try {
        const session = await TrainingSession.create({
            title, date, price, duration, capacity
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a training session
// @route   DELETE /api/training-sessions/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const session = await TrainingSession.findById(req.params.id);
        if (session) {
            await session.deleteOne();
            res.json({ message: 'Session removed' });
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
