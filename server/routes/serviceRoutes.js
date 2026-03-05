const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a new service
// @route   POST /api/services
// @access  Private
router.post('/', protect, async (req, res) => {
    const { name, price, description, image } = req.body;

    try {
        const service = await Service.create({
            name, price, description, image
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            await service.deleteOne();
            res.json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
