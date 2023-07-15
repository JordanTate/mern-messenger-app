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
}

export default Contact;