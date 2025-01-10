const User = require('../models/User');

class ProfileController {
    async getProfile(req, res) {
        try {
            console.log('Request user:', req.user); // Debug req.user
            const userId = req.user?.id;

            if (!userId) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('User found:', user); // Debug data user
            res.status(200).json({ data: user });
        } catch (error) {
            console.error('Server error:', error.message); // Debug error
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}


module.exports = new ProfileController();