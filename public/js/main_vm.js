// imports always go first - if we're importing anything

const socket = io();

//the packet is whatever data we use send through with the connection event from the server
function setUserId(packet) {
    
    console.log(packet);
}

function showDisconnectMessage() {
    console.log('a user disconnected');
}

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage)