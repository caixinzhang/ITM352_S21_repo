//Referece: From lab14
var express = require('express');  //loads the express module
var app = express();  //create new express module 
var myParser = require("body-parser");  //extract incoming data of a POST request
app.use(myParser.urlencoded({ extended: true }));
var qs = require ('qs'); //used variable 'qs' as loaded module

var fs = require('fs'); // fs=file system, require= read/executes the file
const { request } = require('http');

var user_data_file = './user_data.json';     
if(fs.existsSync(user_data_file)) {  //check if file exist

var user_data = JSON.parse(fs.readFileSync('./user_data.json','utf-8')); //read in the data, create user data object
} else {
   console.log(`${user_data_file} does not exist!`);
} 

//response to any HTTP method
app.all('*',function(req,res,next){
    console.log(req.method, req.path);
    next();
});

app.use(express.static('./public'));

//------------processing login-----// Reference: Lab14
app.post('/process_login', function (request,response,next) {
    console.log(request.query)
    //check login and password match database
    let username_entered = request.body["username"];
    let password_entered = request.body["password"];
    if(typeof user_data[username] != 'undefined'){         
        if(user_data[username]['password']==password_entered){
            //all good, send to invoice
            request.query["purchased"] = "true";
            request.query["username"] = request.body["username"];
            response.redirect('invoice.html?' + qs.stringify(request.query));
                } 
                
        }

});

//--------processing register -----------//
app.post('/process_register', function (request,response,next) {

    //create new user
    username = request.body["username"];
      user_data[username] = {}; 
      user_data[username].username=request.body["username"]
      user_data[username].email= request.body["email"];
      user_data[username].password = request.body["password"];
      user_data[username].repeat_password = request.body["password-repeat"];

      //write data into database

      fs.writeFileSync(user_data_file,JSON.stringify(user_data));
      
      //direct to invoice 
      response.redirect('invoice.html?' + qs.stringify(request.query));

    
      //if password wrong direct to login 
      request.query['password_wrong'] = 'true';
      response.redirect('login.html?' + qs.stringify(request.query));
    });



//rounting path 

var listener =app.listen(8080, () => {console.log(`listening on port `+listener.address().port)});