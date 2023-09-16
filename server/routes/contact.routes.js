// Packages
import express from "express";

// Import Controllers
import { getContacts, addContact, searchContacts } from "../controllers/contact.controller.js";
import { verifyAuth } from "../controllers/auth.controller.js";

// Set Express Router
const router = express.Router();

// Routes
router.get('/', verifyAuth, getContacts);
router.post('/', verifyAuth, addContact);
router.post('/search', verifyAuth, searchContacts);

// Export Router
export default router;