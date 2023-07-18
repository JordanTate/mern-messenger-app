// Packages
import express from "express";

// Import Controllers
import { getMessages, postMessage } from "../controllers/message.controller.js";
import { verifyAuth } from "../controllers/auth.controller.js";

// Set Express Router
const router = express.Router();

// Routes
router.get('/', verifyAuth, getMessages);
router.post('/', verifyAuth, postMessage);

// Export Router
export default router;