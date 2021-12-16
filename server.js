const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var Listmsg=[]
app.get('/', (req, res) => {
res.sendFile(__dirname + '/static/chat.html');
});

http.listen(3000, () => {
console.log('listening on *:3000');
});

io.on('connection', (socket) => {
console.log("Nouveau client connecté: " + socket.id);
io.to(socket.id).emit('RécupérerLesMsg',Listmsg);
    socket.on('sendMessage',(msg)=>{
        console.log(msg);
        Listmsg.push(msg)
        console.log(Listmsg);
        io.emit('newMessage',msg);
    })

});