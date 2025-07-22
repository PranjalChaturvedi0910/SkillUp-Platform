require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error("MongoDB connection failed:", err));

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on('connection', (socket) => {
    socket.on('join_room', (room) => socket.join(room));
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend server is running on port ${PORT}`));