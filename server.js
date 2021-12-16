const express = require('express');
const http = require('http');
const fs = require('fs');
const pug=require('pug')

var data=JSON.parse(fs.readFileSync('dinos.json'));

var app = express();
var server = http.createServer(app);
app.set('view engine', 'pug');
app.set('views', 'views/');

server.listen(3003, function() {
    console.log("Serveur démarré");
    var menu=[]
    for(var n in data){
        console.log(n)
        console.log(data[n].nomCommun)
        menu.push(n)
    }
    

    app.get('/',function(req, res){
        var get =req.query.specimen;
        console.log(data[get])
        if(data[get]){
            var locals = {
                nom: data[get].nomCommun,
                type:data[get].type,
                periode:data[get].periode,
                poids :data[get].poids,
                longueur:data[get].longueur,
                description:data[get].description,
                image:data[get].image,    
                menu:menu            
                };
            console.log("Info dispo")
            res.render("fiche", locals);
        }
        else{
            res.status(404).send("Pas d'info sur ce dino");
        }
    })

    app.use('/images', express.static('images'));
});