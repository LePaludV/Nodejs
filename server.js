const express = require('express');
const { emit } = require('process');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//init du tableau 
const width = 7;
const height = 6;

//data
var data = new Array(width);
for (let i=0; i<width; i++) {
    data[i] = [];
}
//console.log(data);


//init des players
var players=[]
//players[0] = J1
//players[1] =J2 
//les autres players sont des observateur

var turn=1

app.get('/', (req, res) => {
res.sendFile(__dirname + '/static/puissance4.html');
});
app.use('/static', express.static('static'));
http.listen(3000, () => {
console.log('listening on *:3000');

});

io.on('connection', (socket) => {
    console.log("Nouveau client connecté: " + socket.id);
    players.push(socket.id)
    //
    update(data)
    //Dit au client son role 
    io.to(socket.id).emit('player_has_joined',players.length);

    socket.on('player_plays',(newData,whoIsPlaying)=>{
        //maj du board
        data=newData
        turn=3-whoIsPlaying
        console.log('modif',newData);     
        update(data)
    })
    function update(data) {

        console.log("MAJ");
        io.emit('update_board',data,turn);
    }
    
    socket.on("disconnect", function(){
        console.log("client disconnected from server",socket.id);
        var n=0
        //Si le client qui a déco et le 0 ou 1 alors c'est un joueur pas un spec
        for(var i = 0;i<2; i++){
            if(players[i]==socket.id){
                //console.log("Joueur "+ (i+1) +" left");
                io.emit('rage_quit',i+1)
            }
        }
       
    });
    socket.on('restart',function(){io.emit('clear')})

});