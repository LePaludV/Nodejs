const express = require('express');
const http = require('http');
const fs = require('fs');
const pug=require('pug')

var data=JSON.parse(fs.readFileSync('books.json'));
//console.log(data)
var app = express();
var server = http.createServer(app);
app.set('view engine', 'pug');
app.set('views', 'views/');

for(i in data){
    data[i].note=Math.floor(Math.random() * (5));
    
}

server.listen(3000, function() {
    app.get('/',function(req, res){
        res.render('index',{data:data})
    })
    app.get('/item',function(req, res){
        console.log('yes');
        var rank=req.query.rank
        console.log(rank);
        console.log(data[rank]);

        res.render('item',{data:data[rank]})
    })
    app.get('/setRating',function (req,res) {
        var book=req.query.book
        var note=req.query.note
        console.log(book,note);
        data[book].note=note
        console.log(book);

      })

    app.use('/images', express.static('images'));
    app.use('/views', express.static('views'));
});