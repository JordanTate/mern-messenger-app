// Database
import db from '../config/db.config.js';

const Contact = {
    async getContacts(user_id) {
        return new Promise((resolve, reject) => {
            db.query('CALL GetContacts(?)', user_id, (error, results) => {
                if (error) reject(new Error(error));

                const contacts = results[0];

                resolve(contacts);
            });
        });
    },

    async addContact(user_id, contact_id) {
        return new Promise((resolve, reject) => {
            db.query('CALL AddContact(?, ?)', [user_id, contact_id], (error, results) => {
                if (error) reject(new Error(error));

                const contact = results[0][0];

                resolve(contact);
            });
        });
    },

    async searchContacts(query) {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, username FROM users WHERE username LIKE ? OR email LIKE ?', [`%${query}%`, `%${query}%`], (error, results) => {
                if (error) reject(new Error(error));

                const contacts = [...results];

                resolve(contacts);
            });
        });
    }
}

export default Contact;