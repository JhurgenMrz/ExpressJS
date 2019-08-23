const express = require('express');

const app = express();
app.get('/', function(req, res, next){
    res.send({Hello: "World"})
})

const server = app.listen(8000, function(){
    console.log(`Listen http://localhost:${server.address().port}`)
});