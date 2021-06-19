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
    console.log('new web socket connection')
    socket.emit('message', message );

    socket.on('chat', (chat: string) => {
        io.emit('message', chat)
    })
})

server .listen(port, () => {
    console.log(`server listening on port: ${port}`);
});