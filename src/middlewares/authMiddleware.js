const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debug token
        req.user = decoded; // Pastikan ini memiliki `id`
        next();
    } catch (error) {
        console.error('Invalid token error:', error.message); // Log error
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
