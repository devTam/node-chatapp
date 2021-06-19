
const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

const input = document.getElementById('message');

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const chat = input.value;
    socket.emit('chat', chat, () => {
        console.log('The message was delivered')
    });
    input.value = '';
});

document.getElementById('send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', location, () => {
            console.log('Location shared');
        });
    });
})