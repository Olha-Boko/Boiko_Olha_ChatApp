// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

//the packet is whatever data we use send through with the connection event from the server

//this is data destructuring. go look it up on MDN
function setUserId({sID}) {
    
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('a user disconnected');
}

function appendMessage(message) {
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: []
    },

    methods: {
        //emit a message event to the server so that it canin turn send this to anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');

            // this operarot || means "or", if the first value is set use it, else use whatever comes after the ||    
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })

            this.message = "";
        }
    },

    mounted: function() {
        console.log('vue is done mounting');
    },
    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);