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

const addContact = async (req, res) => {
    const user = req.user;

    const { contact } = req.body;

    try {
        const newContact = await Contact.addContact(user.id, contact);

        return res.status(200).json(newContact);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const searchContacts = async (req, res) => {
    const user = req.user;

    const { query } = req.body;

    try {
        const contacts = await Contact.searchContacts(user.id, query);

        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export default { getContacts, addContact, searchContacts};