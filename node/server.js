// le module http est n'ecessaire et devra être installé

const { stat } = require('fs');
var http = require('http');
var horodates=[];

var format = require("date-format");
var now = new Date();
const { table } = require('table');
const fs = require('fs')

var app = http.createServer(function(req, res) {
// l’entête de la r ́eponse : 200 = OK

res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
// les donn ́ees `aenvoyer au client en r ́eponse `aune requˆete
//res.write("<h1> Bravo </h1>")
//res.write("Ce  ne sait rien dire d’autre que cela.");
var success=[{statut :0,message:'avec plaisir'},
{statut:-1,message:'et le mot magique ?'}
]

var get =req.url

    console.log(get)
    var nd=new Date()
    var date=format.asString('dd/MM/yy', nd);
    var heure=format.asString('hh/mm/ss', nd);
    if(get=="/stp"){
        console.log(JSON.stringify(success))
        res.write(JSON.stringify(success[0]))
    }
    else if(get=="/display"){
        
        res.write(table(horodates));
    }
    else if(get=="/save"){
        res.statusCode = 418;
        

        
        fs.writeFile('horodates.json', JSON.stringify(horodates), function (err) {
            if (err) return console.log(err);
          });
          
        

      
    }

    else if(get!="/"){
        horodates.push([date+" à "+heure,get])
    }
console.log(horodates)



res.end();
});

 // le serveur  ́ecoute sur le port 3000
 app.listen(3000)