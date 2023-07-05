// Packages
import express from "express";
import cors from "cors";
import "./config/env.config.js";

// Route Handlers
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

// Set Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Configure Port
const PORT = process.env.PORT || 3001;

// Listen
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
