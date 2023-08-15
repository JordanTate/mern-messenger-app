// Packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/env.config.js";
import socketIO from "./config/socket.io.config.js";

// Route Handlers
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import messageRoutes from "./routes/message.routes.js";

// Set Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messageRoutes);

// Configure Port
const PORT = process.env.PORT || 3001;

// Socket.io
const server = socketIO(app);

// Listen
server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});
