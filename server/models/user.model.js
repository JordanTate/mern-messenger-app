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
        // Check Database for Existing User or Credentials
        const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
        // If User already exists but `username` and `password` matches, then login()
        if (results.length > 0) {
            const existingUser = results[0];
    
            if (username == existingUser.username && bcrypt.compare(password, existingUser.password))
                return this.login({ email, password });
            else
                throw new Error('User already exists');
        }
    
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        // Create User
        try {
            const user = await db.query('INSERT INTO users SET ?', { username, email, password: hash });
    
            // After successfully creating the User, login()
            return this.login({ email: user.email, password });
        } catch (error) {
            throw new Error('There was an issue creating the user. Please try again.');
        }
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