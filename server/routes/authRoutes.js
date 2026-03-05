const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/adminConfig');
const { protect } = require('../middleware/authMiddleware');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('--- LOGIN DEBUG ---');
    console.log('Received:', { email: `"${email}"`, password: `"${password}"` });
    console.log('Expected:', { email: `"${ADMIN_EMAIL}"`, password: `"${ADMIN_PASSWORD}"` });

    const matchEmail = email?.trim() === ADMIN_EMAIL?.trim();
    const matchPassword = password?.trim() === ADMIN_PASSWORD?.trim();

    console.log('Match Result:', { email: matchEmail, password: matchPassword });

    if (matchEmail && matchPassword) {
        res.json({
            _id: 'admin',
            name: 'Admin',
            email: ADMIN_EMAIL,
            role: 'admin',
            token: jwt.sign({ id: 'admin' }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
