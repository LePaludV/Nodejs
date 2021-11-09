
continents =[ 
    {nom: 'Afrique', population: 1340 },
    {nom: 'Amérique', population: 800 },
    {nom: 'Asie', population: 4641 },
    {nom: 'Europe', population: 747 },
    {nom: 'Océanie', population: 42 }
]
var s=0
continents.forEach(function(continents){
console.log(continents.nom)
s+=continents.population
});
console.log("La population mondiale s'élève à "+s+" Mhabs" )

const { table } = require('table');
const fs = require('fs');
const figlet = require('figlet');


figlet('Démographie', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    
    console.log(data)


    const dem = JSON.parse(fs.readFileSync('data.js')); 
    console.log(table(dem));
});


