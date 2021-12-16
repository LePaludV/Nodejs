const express = require('express');
const { emit } = require('process');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var colors = ['aqua', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow' ];

var canvas = new Array(25);
for (var i=0; i<canvas.length; i++) {
    canvas[i] = new Array(25);
    for (var j=0; j<canvas[i].length; j++) {
        canvas[i][j] = 'white';
    }
}




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/client.html');
    });
    app.use('/static', express.static('static'));
    http.listen(3000, () => {
    console.log('listening on *:3000');
    
    });

    io.on('connection', (socket) => {
        console.log("Nouveau client connecté: " + socket.id);
        io.to(socket.id).emit('player_has_joined',{n:colors[Math.floor(Math.random() * colors.length)],c:canvas});
        socket.on('player_plays',(c)=>{
            canvas=c
            io.emit('maj',canvas)
        })

    })

