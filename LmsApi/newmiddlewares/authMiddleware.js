// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

exports.isTeacher = (req, res, next) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access forbidden' });
    next();
};
