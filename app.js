var express = require('express');
var app = express();

//add socket here
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

//attach our chat server to our app
io.attach(server);

io.on('connection', function(socket) { //socket is your connection
    console.log('a user has connected');
    socket.emit('connected', {sID: socket.id, message: "new connection"});

    socket.on('chat_message', function(msg) {
        console.log(msg); //let's see what the payload is from the client side

        //tell the connection maneger (socket.io) to send this message to everyone who is our chat
        io.emit('new_message', { id: socket.id, message: msg })
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    })
})

//EMOJI FUNCTION
//from the https://openbase.io/js/node-emoji
var emoji = require('node-emoji')
emoji.get('coffee') // returns the emoji code for coffee (displays emoji on terminals that support it)
emoji.which(emoji.get('coffee')) // returns the string "coffee"
emoji.get(':fast_forward:') // `.get` also supports github flavored markdown emoji (http://www.emoji-cheat-sheet.com/)
emoji.emojify('I :heart: :coffee:!') // replaces all :emoji: with the actual emoji, in this case: returns "I ❤️ ☕️!"
emoji.random() // returns a random emoji + key, e.g. `{ emoji: '❤️', key: 'heart' }`
emoji.search('cof') // returns an array of objects with matching emoji's. `[{ emoji: '☕️', key: 'coffee' }, { emoji: ⚰', key: 'coffin'}]`
emoji.unemojify('I ❤️ 🍕') // replaces the actual emoji with :emoji:, in this case: returns "I :heart: :pizza:"
emoji.find('🍕') // Find the `pizza` emoji, and returns `({ emoji: '🍕', key: 'pizza' })`;
emoji.find('pizza') // Find the `pizza` emoji, and returns `({ emoji: '🍕', key: 'pizza' })`;
emoji.hasEmoji('🍕') // Validate if this library knows an emoji like `🍕`
emoji.hasEmoji('pizza') // Validate if this library knowns a emoji with the name `pizza`
emoji.strip('⚠️ 〰️ 〰️ low disk space') // Strips the string from emoji's, in this case returns: "low disk space".
emoji.replace('⚠️ 〰️ 〰️ low disk space', (emoji) => `${emoji.key}:`) // Replace emoji's by callback method: "warning: low disk space"

