var express = require('express'); // loads in the request 
var app = express();
var myParser = require("body-parser");  //take request, and read through the body
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true }));
var qs =require('qs');


app.all('*',function(req,res,next){
    console.log(req.method,req.path)
});

//this proess the login form 
app.post('/process_login', function (request,response,next) {
    response.send(request.body);
});

//this process the registration 
app.post('/process_registration', function (request,response,next) {
    response.send(request.body);
});
    

app.use(express.static('./stastic'));

var listener =app.listen(8080, () => {console.log(`listening on port 8080`+listener.address().port)});