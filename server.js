const express = require('express');
const http = require('http');
const fs = require('fs');
var app = express();
app.set('view engine', 'pug');
app.set('views', 'views/');
var server = http.createServer(app);

let data=JSON.parse(fs.readFileSync('data.json'));
console.log(data)
server.listen(3003, function() {
console.log("Serveur démarré");

app.get('/userin',function(req, res){
    var username=req.query.username

   console.log(data)

    if(data.user.includes(username)){
        var locals = {
            username: username,
            firstTime: false
            };
    }
    else{
        console.log("1ere fois")
        var locals = {
            username: username,
            firstTime: true
            };

        data.user.push(username)
        
    }
    
   
    res.render("index", locals);

    fs.writeFileSync("data.json",JSON.stringify(data))
    });



    
    
 });