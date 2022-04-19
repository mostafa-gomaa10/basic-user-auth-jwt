const RefreshToken = require('./models/RefreshToken');
const jwt = require('jsonwebtoken');

// Create new access token from refresh token
const genAccessTokenFromRefreshToken = async (req, res) => {
    const refreshToken = req.header("x-auth-token");

    // If token is not provided, send error message
    if (!refreshToken) {
        return res.status(401).json({ error: "Token not provided" });
    }


    try {
        const token = await RefreshToken.findOne({ identifier: refreshToken })
        if (token) {
            try {
                const user = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

                // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
                const { id } = user;
                const accessToken = await jwt.sign(
                    { id },
                    process.env.SECRET_TOKEN,
                    { expiresIn: "10s" }
                );
                res.json({ accessToken });
            } catch (error) {
                return res.status(403).json({ error: 'Invalid Token' });
            }
        }
    } catch (error) {
        return res.status(403).json({ error: "Token not found" });
    }

};


module.export = {
    genAccessTokenFromRefreshToken
}