const express = require('express')
const http = require('http')

var app = express();
var server = http.createServer(app);

server.listen(3000, function() {
    app.use('/', express.static('website'));
    console.log("Serveur démarré");
 });