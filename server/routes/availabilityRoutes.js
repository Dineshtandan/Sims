const express = require('express');
const router = express.Router();
const AvailabilityBlock = require('../models/AvailabilityBlock');
const { protect } = require('../middleware/authMiddleware');

// @desc    Block time slot
// @route   POST /api/availability/block
// @access  Private
router.post('/block', protect, async (req, res) => {
    const { start, end, reason } = req.body;

    try {
        const block = await AvailabilityBlock.create({
            start, end, reason
        });
        res.status(201).json(block);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
