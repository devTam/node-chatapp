
const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

const input = document.getElementById('message');

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const chat = input.value;
    socket.emit('chat', chat);
    input.value = '';
});