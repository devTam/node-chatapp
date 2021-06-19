import express from 'express'; 
import path from 'path';
import http from 'http';
const socketio = require('socket.io');

const app = express(); 
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 5000;
app.use(express.json());

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

const message = 'Welcome to my chatapp';

io.on('connection', (socket: any) => {
    socket.emit('message', message );
    socket.broadcast.emit('message', 'A new user has joined!');


    socket.on('chat', (chat: string, callback: Function) => {
        io.emit('message', chat);
        callback();
    });

    socket.on('sendLocation', (location: { latitude: number, longitude: number }, callback: Function) => {
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
        callback();
    });

    // When a user leaves
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server .listen(port, () => {
    console.log(`server listening on port: ${port}`);
});