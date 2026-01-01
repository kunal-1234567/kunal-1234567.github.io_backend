const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        console.log("Verifying Token:", token);
        const decoded = jwt.verify(token, 'SpiltzySecretKey#123');
        req.user = decoded;
        console.log("Decoded User:", req.user);
        next();
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
module.exports = { verifyToken };