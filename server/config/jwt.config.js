// Packages
import jwt from 'jsonwebtoken';

// Models
import User from '../models/user.model.js';

// JWT Functions
const createAccessToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1m' });

const createRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

const authenticateToken = (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) return reject(new Error('Unauthorized'));

        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return reject(new Error('Forbidden'));

            const { id } = decoded;

            try {
                const user = await User.findById(id);

                resolve(user);
            } catch (error) {
                return reject(new Error(error));
            }
        });
    });
}

export { createAccessToken, createRefreshToken, authenticateToken };