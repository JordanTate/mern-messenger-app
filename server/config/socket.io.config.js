import { createServer } from 'http';
import { Server } from 'socket.io';

const connections = new Map();

export default function socketIO(app) {
    // Setup Socket.io with Express App
    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    // Socket Events
    io.on('connection', (socket) => {
        socket.on('addUser', (req) => {
            const { token, ...user } = req;

            const existingConnection = connections.get(user.id);

            if (existingConnection) {
                existingConnection.socket = socket;
                connections.set(user.id, {...existingConnection});
            } else {
                connections.set(user.id, { socket, user });
            }

        });

        socket.on('sendMessage', (message) => {
            if (!message) return;
            
            const connection = connections.get(message.sender_id);
            const receivingConnection = connections.get(message.recipient_id);

            if (connection != null && receivingConnection != null) {
                // Emit message to the receiving user
                if (receivingConnection) {
                    io.to(receivingConnection.socket.id).emit('newMessage', {
                        ...message
                    });
                }
            }
        });

        socket.on('disconnect', () => {
            connections.forEach((connection) => {
                if (connection.socket.id === socket.id) {
                    connections.delete(connection.user.id);
                }
            });
        });

    });

    return server;
}