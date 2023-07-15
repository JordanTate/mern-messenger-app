// Models
import Contact from '../models/contact.model.js';

// Controller Functions
const getContacts = async (req, res) => {
    const user = req.user;

    try {
        const contacts = await Contact.getContacts(user.id);

        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export default getContacts;