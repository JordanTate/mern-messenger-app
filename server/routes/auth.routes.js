// Packages
import express from "express";

// Import Controllers
import { handleAuth, refreshToken } from "../controllers/auth.controller.js";

// Set Express Router
const router = express.Router();

// Routes
router.post('/', handleAuth);
router.post('/refresh', refreshToken);

// Export Router
export default router;
