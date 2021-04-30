//Referece: From lab14
var express = require('express');  //loads the express module
var app = express();  //create new express module 
var myParser = require("body-parser");  //extract incoming data of a POST request
app.use(myParser.urlencoded({ extended: true }));
var qs = require ('qs'); //used variable 'qs' as loaded module
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
var {check, validationResult} = require('express-validator');
const shift = 4; //shift for encyption





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




function encrypt(password){
	//-------encrypt the password -------//

 	var encrypted = [];
 	var encrypted_result = "";

 	//encrypt the password
 	for (var i = 0; i < password.length; i++){
 		encrypted.push(password.charCodeAt(i)+shift);
 		encrypted_result += String.fromCharCode(encrypted[i]);
 	}
 	return encrypted_result;
}




//------------processing login-----// Reference: Lab14
app.post('/process_login', function (request,response,next) {

	
    console.log(request.query)
    //check login and password match database
    let username_entered = request.body["username"];
    let password_entered = request.body["password"];
    let encrypted_password_input = encrypt(password_entered)
    if(typeof user_data[username_entered] != 'undefined'){         
        if(user_data[username_entered]['password']==encrypted_password_input){
            //all good, send to invoice
            request.query["purchased"] = "true";
            request.query["username"] = request.body["username"];
            response.redirect('invoice.html?' + qs.stringify(request.query));
                } else{
        	var failed = [];
        	failed.push("Invalid username or password.");
        	request.query.failed = failed.join("<br />");
        	console.log(failed);
        	response.redirect('login.html?' + qs.stringify(request.query));

        }
        }else{
        	var failed = [];
        	failed.push("Invalid username or password.");
        	request.query.failed = failed.join("<br />");
        	console.log(failed);
        	response.redirect('login.html?' + qs.stringify(request.query));

        }

});




//--------processing register -----------//
app.post('/process_register', function (request,response,next) {


 	//-------username validation---------//
 	const violations = [];

 	//check if the username is blank
 	 if (request.body.username == ''){
 		violations.push("- The username cannot be blank.");

 		
 	}
 	//check the length of the username
 	if(request.body.username.length < 5 || request.body.username.length > 10){
 		violations.push("- The username must be between 5 to 10 characters long");
 		
 	} 
 	//check if username contains only letters and numbers
 	if (/^[0-9a-zA-Z]+$/i.test(request.body.username) == false){
 		violations.push("- The username must be contains only letters and numbers");
 		
 	}
 	//check for duplicate usernames
 	for (var i in user_data){
		if(i == request.body.username){
			violations.push("- Username already exists.");
			
		}
 	}

 	//-------password validation -------//


 	//check if the password is blank
 	if (request.body.password == ''){
 		violations.push("- The password field cannot be blank.");
 	}
 	//check if both password and confirmed password is the same
 	if (request.body.password_repeat !== request.body.password){
 		violations.push("- The passwords you have entered does not match.");
 	}
 	//check the length of the password
 	if (request.body.password.length < 6){
 		violations.push("- The password must be at least 6 characters long");
 	}

 	//------email address validation------//

 	//check if the email field is blank
 	if (request.body.email == ''){
 		violations.push("- The email field cannot be blank");
 	}

 	//check if the email is in proper format.
 	if (/^[^\s@]+@[^\s@]+$/.test(request.body.email) == false){
 		violations.push("- The email address you entered is not in valid format.");
 	}

 	//--------full name validation -------//

 	//check if the name contains only letters.
 	if (/^[A-Za-z]+$/i.test(request.body.fullname) == false){
 		violations.push("- The full name must be contain only letters.");
 	}

 	let encrypted_pass = encrypt(request.body.password);

 	if (violations.length === 0){
		 username = request.body.username.toLowerCase();
		  user_data[username] = {}; 
		  user_data[username].fullname=request.body.fullname;
		  //user_data[username].username=request.body["username"]
		  user_data[username].email= request.body.email;
		  user_data[username].password = encrypted_pass;
		  //user_data[username].repeat_password = request.body.password_repeat;
		  request.query["username"] = username;
		 fs.writeFileSync(user_data_file, JSON.stringify(user_data));
		 response.redirect('invoice.html?' + qs.stringify(request.query));

 	}else if (violations.length > 0){
 		console.log(violations.join(' '));
 		//response.send(violations.join(' '));

 		request.query.violations = violations.join("<br />");
 		response.redirect('register.html?' + qs.stringify(request.query));
 	}

    
      //if password wrong direct to login 
      // request.query['password_wrong'] = 'true';
      // response.redirect('login.html?' + qs.stringify(request.query));
    });






//rounting path 

var listener =app.listen(8080, () => {console.log(`listening on port `+listener.address().port)});