// Imports are hoisted, making the dotenv.config() call too late before the routes are imported.
// To fix this, we can create a new file in the config folder called env.config.js and move the dotenv.config() call there.
import dotenv from 'dotenv';

// Configure Environment Variables for Development Environment
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
};