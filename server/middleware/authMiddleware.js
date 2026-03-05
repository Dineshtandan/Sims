const jwt = require('jsonwebtoken');
const { ADMIN_EMAIL } = require('../config/adminConfig');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-auth-token']) {
        token = req.headers['x-auth-token'];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id === 'admin') {
            req.user = {
                _id: 'admin',
                name: 'Admin',
                email: ADMIN_EMAIL,
                role: 'admin',
                isAdmin: true
            };
            next();
        } else {
            res.status(401).json({ message: 'Not authorized, invalid user' });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = { protect };
