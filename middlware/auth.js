const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    try {
        const verify = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = verify;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Token' });
    }
}

module.exports = {
    checkAuth
}