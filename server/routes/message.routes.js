// Packages
import express from "express";

// Import Controllers
import handleMessages from "../controllers/message.controller.js";
import { verifyAuth } from "../controllers/auth.controller.js";

// Set Express Router
const router = express.Router();

// Routes
router.get('/', verifyAuth, handleMessages);

// Export Router
export default router;