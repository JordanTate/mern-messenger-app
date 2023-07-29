// Models
import Message from '../models/message.model.js';

// Controller Functions
const getMessages = async (req, res) => {
    const { user_id, contact_id, offset } = req.query;

    try {
        const messages = await Message.find({ user_id, contact_id, offset});

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const postMessage = async (req, res) => {
    const { sender_id, recipient_id, content } = req.body;

    try {
        const message = await Message.create({ sender_id, recipient_id, content });

        return res.status(200).json({ message });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { getMessages, postMessage };