var express = require('express');  
var app = express();
var myParser = require("body-parser");  
app.use(myParser.urlencoded({ extended: true }));
var qs = require ('qs');
var fs = require('fs');
var path = require('path');

//var user_data =require('./user_data.json');
// read user data file 
//console.log(user_data['dport']['password']);
var user_data_file = './user_data.json';
if(fs.existsSync(user_data_file)) {
    var file_stats =fs.statSync(user_data_file);
    //console.log(`${user_data_file}has${file_stats["size"]}characters`);

    app.get('/', function(res, req) {
        res.SendFile(path.join(__dirname + '/static/login.html'));
    }
    );


var user_data = JSON.parse(fs.readFileSync('./user_data.json','utf-8')); //read in the data
} else {
   // console.log(`${user_data_file} does not exist!`);
}
app.all('*',function(req,res,next){
    console.log(req.method,req.path)
});

//this proess the login form 
app.post('/process_login', function (request,response,next) {
    console.log(request,body);
    let username_entered = request.body["uname"];
    let paswword_entered = request.body["psw"];
    if(typeof user_data[username] != 'undefined'){
        if(user_data[username]['password']==password_entered){
            response.send(`${username_entered} is logged in `);
        } else {response.send(`${username_entered} password is wrong `);
        } 
}
    //check login and password match database

    //all good, send to invoice
    request.query["purchased"] = "true";
    request.query["uname"] = request.body["uname"];
    response.redirect('products_store.html?' + qs.stringify(request.query));
});

//this process the login form
app.post('/process_register', function (request,response,next) {
    response.send(request.body);
});
    

app.use(express.static('./stastic'));

//rounting path 
var listener =app.listen(8080, () => {console.log(`listening on port 8080`+listener.address().port)});