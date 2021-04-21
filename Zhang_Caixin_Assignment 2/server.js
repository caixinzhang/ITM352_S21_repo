var express = require('express');  
var app = express();
var myParser = require("body-parser");  
app.use(myParser.urlencoded({ extended: true }));
var qs = require ('qs');
var fs = require('fs');
var user_data =require('./user_data.json');
// read user data file 
var user_data_file = './user_data.json';     
if(fs.existsSync(user_data_file)) {  //check if file exist
    var file_stats =fs.statSync(user_data_file);


var user_data = JSON.parse(fs.readFileSync('./user_data.json','utf-8')); //read in the data, create user data object
} else {
   console.log(`${user_data_file} does not exist!`);
} 

app.all('*',function(req,res,next){
    console.log(req.method, req.path);
    next();
});

app.use(express.static('./static'));

//this proess the login form 
app.post('/process_login', function (req,res,next) {
    console.log(request.body);
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
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
    response.redirect('./login.html?' + qs.stringify(request.query));
});

//this process the registrer form
app.post('/process_register', function (request,response,next) {
  
   //new register user
      user_data[username] = {}; 
      user_data[username].name = req.body.fullname;
      user_data[username].password= req.body.password;
      user_data[username].email = req.body.email;
      data = JSON.stringify(user_data); 
      fs.writeFileSync(filename, data, "utf-8");
      res.redirect('./invoice4.html?' + queryString.stringify(req.query));
    });

 //Processing to purchase page
app.post("/process_purchase", function (request, response) {
    let POST = request.body; 
})

//rounting path 

var listener =app.listen(8080, () => {console.log(`listening on port `+listener.address().port)});