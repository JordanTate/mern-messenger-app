// JWT Config
import { createAccessToken, createRefreshToken, authenticateToken } from '../config/jwt.config.js';

// Models
import User from '../models/user.model.js';

const handleAuth = async (req, res) => {
    const { username, email, password, type } = req.body;

    switch (type) {
        case 'LOGIN':
            try {
                const user = await User.login({ email, password });

                const accessToken = createAccessToken(user.id);
                const refreshToken = createRefreshToken(user.id);

                res.cookie('token', refreshToken, { httpOnly: true, SameSite: 'none' });

                return res.status(200).json({ user_id: user.id, username: user.username, token: accessToken });
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        case 'SIGNUP':
            try {
                const user = await User.signup({ username, email, password });

                const accessToken = createAccessToken(user.id);

                return res.status(200).json({ user_id: user.id, username: user.username, token: accessToken });
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        case 'LOGOUT':
            try {
                return res.clearCookie('token').status(200).json({ message: 'User successfully logged out.' });
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        default:
            return res.status(500).json({ message: 'Invalid request' });
    }
};

const verifyAuth = async (req, res, next) => {
    const authorization = req.headers['authorization'];

    const accessToken = authorization && authorization.split(' ')[1];

    if (!accessToken) return res.status(401).json({ message: 'Unauthorised' });

    try {
        const user = await authenticateToken(accessToken);

        req.user = user;

        next();
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
};

const refreshToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'Unauthorised' });

    try {
        const user = await authenticateToken(token);

        const accessToken = createAccessToken(user.id);

        return res.status(200).json({ token: accessToken });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: error.message });
    }
};

export { handleAuth, verifyAuth, refreshToken };