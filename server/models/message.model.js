// Database
import db from '../config/db.config.js';

const Message = {
    async create({ sender_id, recipient_id, content }) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO messages SET ?', { sender_id, recipient_id, content }, (error, results) => {
                if (error) reject(new Error(error));

                const { insertId } = results;

                db.query('SELECT * FROM messages WHERE id = ?', insertId, (error, results) => {
                    if (error) reject(new Error(error));

                    resolve(results[0]);
                });
            });
        });
    },

    async find({ user_id, contact_id, offset }) {
        return new Promise((resolve, reject) => {
            db.query('CALL GetMessages(?, ?, ?)', [user_id, contact_id, offset], (error, results) => {
                if (error) reject(new Error(error));

                resolve(results[0]);
            });
        });
    }
}

export default Message;