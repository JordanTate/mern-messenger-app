// Packages
import bcrypt from "bcrypt";

// Import Database
import db from "../config/db.config.js";

const User = {
    // User Login and Sign Up Functions
    async login({ email, password }) {
        return new Promise((resolve, reject) => {
            // Check Database for Existing User or Credentials
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) reject(new Error(error));

                if (!results || results?.length === 0) return reject(new Error('User not found'));

                const user = {...results[0]};

                const isPasswordCorrect = bcrypt.compareSync(password, user.password);

                if (!isPasswordCorrect) return reject(new Error('Invalid credentials'));

                resolve(user);
            });
        });
    },
    
    async signup({ username, email, password }) {
        return new Promise((resolve, reject) => {
            // Check Database for Existing Username or Email
            db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
                if (error) reject(new Error(error));

                if (results.length > 0) return reject(new Error('Username or Email already exists'));

                // Hash Password
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) reject(new Error('There was an error during the user creation progress. Please try again.'));

                    // Create User
                    db.query('INSERT INTO users SET ?', { username, email, password: hash }, (error, results) => {
                        if (error) reject(new Error('There was an issue creating the user. Please try again.'));

                        // After successfully creating the User, login()
                        resolve(this.login({ email, password }));
                    });
                });
            });
        });
    },

    async findById(id) {
        return new Promise((resolve, reject) => {
            // Check Database for Existing User or Credentials
            db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
                if (error) reject(new Error(error));

                if (!results || results?.length === 0) return reject(new Error('User not found'));

                const user = {...results[0]};

                resolve(user);
            });
        });
    },

    async findByString(string) {
        return new Promise((resolve, reject) => {
            // Check Database for Existing Users
            db.query('SELECT * FROM users WHERE username LIKE ? OR email LIKE ?', [`%${string}%`, `%${string}%`], (error, results) => {
                if (error) reject(new Error(error));

                if (!results || results?.length === 0) return reject(new Error('No users found'));

                const users = [...results];

                resolve(users);
            });
        });
    }
}

export default User;