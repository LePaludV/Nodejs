// le module http est n'ecessaire et devra être install ́e
const { stat } = require('fs');
var http = require('http');

var app = http.createServer(function(req, res) {
// l’entête de la r ́eponse : 200 = OK

res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
// les donn ́ees `aenvoyer au client en r ́eponse `aune requˆete
//res.write("<h1> Bravo </h1>")
//res.write("Ce  ne sait rien dire d’autre que cela.");
var success=[{statut :0,message:'avec plaisir'},
{statut:-1,message:'et le mot magique ?'}
]
var get =req.url
success.forEach(function(staut){
    console.log(statut)
})
res.write(JSON.stringify(success))

res.end();
});

 // le serveur  ́ecoute sur le port 3000
 app.listen(3000)