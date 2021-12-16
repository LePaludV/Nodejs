const express = require('express');
const http = require('http');
const fs = require("fs");

var app = express();
var server = http.createServer(app);

let rules=JSON.parse(fs.readFileSync('rules.json'));

server.listen(3003, function() {
console.log("Serveur démarré");

app.get('/',function(req, res){
   
    res.sendFile(__dirname+'/rps7.html');;})

app.get('/ressources/:id',function(req, res){
    res.sendFile(__dirname+'/static/'+req.params.id);;
    })

app.get('/fight', function(req, res){
    var player = req.query.player;
    var cpu = req.query.cpu;
    console.log(player,cpu)
    console.log(rules[player][cpu])
    if(player==cpu){
        console.log("égalité")
        var result={outcome: 0};
    }
    else if(rules[player][cpu]){
        console.log('player gagne');
        var result={outcome: 1, message: rules[player][cpu]}
        
          }
    else if(rules[cpu][player]){
        console.log("cpu gagne")
        var result={outcome: -1, message: rules[cpu][player]}
    }
    
    res.send(result);
})
 });