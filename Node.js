const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = new Set();

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('new user', (username) => {
        socket.username = username;
        users.add(username);
        io.emit('update user count', users.size);
        io.emit('chat message', { user: 'Server', message: `${username} has joined the chat.` });
    });

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            users.delete(socket.username);
            io.emit('update user count', users.size);
            io.emit('chat message', { user: 'Server', message: `${socket.username} has left the chat.` });
        }
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
