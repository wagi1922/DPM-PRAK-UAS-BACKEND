const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Cek apakah header Authorization ada
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Ambil token dari header
    const token = authHeader.split(' ')[1];

    try {
        // Verifikasi token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Debug payload token (pastikan memiliki `id` atau `_id`)
        console.log('Decoded token:', decoded);

        // Tambahkan informasi pengguna ke `req.user`
        req.user = decoded;

        // Pastikan token memiliki properti `id` atau `_id`
        if (!req.user.id && !req.user._id) {
            return res.status(401).json({ message: 'Invalid token payload: Missing user ID' });
        }

        next();
    } catch (error) {
        // Log error jika token tidak valid
        console.error('Invalid token error:', error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
