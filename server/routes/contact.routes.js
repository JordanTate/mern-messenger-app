// Packages
import express from "express";

// Import Controllers
import getContacts from "../controllers/contact.controller.js";
import { verifyAuth } from "../controllers/auth.controller.js";

// Set Express Router
const router = express.Router();

// Routes
router.get('/', verifyAuth, getContacts);

// Export Router
export default router;