const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
res.sendFile(__dirname + '/static/chat.html');
app.use('/static', express.static('static'));
});
http.listen(3000, () => {
console.log('listening on *:3000');
});

io.on('connection', (socket) => {
console.log("Nouveau client connecté: " + socket.id);
socket.on('sendMessage', (msg) => {
    console.log(msg);
    io.emit('newMessage', msg);
    });

});