const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Make sure this matches your renamed User model!

const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get the token from the header (Split "Bearer <token>" and take the second part)
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database, excluding the password
            req.user = await User.findById(decoded.id).select('-password');

            // Move to the next middleware or controller
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token was provided
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };