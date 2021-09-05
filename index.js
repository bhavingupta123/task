const express = require('express') /* require the needed libraries */
const app = express();
const http = require('http');
const path = require('path');

const router = express.Router()

//const fetch = require('node-fetch');
const mongoose = require('mongoose') // connecet to mongoDB
//const axios = require("axios");
//const bodyparser = require('body-parser')

app.use(express.static(path.join(__dirname, 'views')));

app.set('views','views')
app.set('view engine','ejs') // use .ejs for views , to show dynamic data
app.use(express.urlencoded({ extended: false }))

const adminData = require('./models/admin_data'); // admin data DB schema
const usersData = require('./models/users_data'); // user data DB schema


mongoose.connect('mongodb://103.86.177.201:32768/task', { //connect to local mongoDB
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected')
})
.catch(err => console.log(err))

app.get('/',(req,res)=>{

    res.render("index"); // show home page for default route
});

app.get('/admin',(req,res)=>{

  res.render('admin_login',{verify:-1}); // display admin page
});

app.post('/admin',(req,res)=>{ // post method to accept data for admin login
  var userId = req.body.userId;
  var password = req.body.password;
  console.log(userId);
  console.log(password)


  adminData.findOne({userId:userId,password:password},function(err,founduser){ // check if admin DB has such user 
    if(err){
        res.send(err);
        console.log("error")
    }else{

        if(founduser) // if user found
        {   
          verify=1;
          console.log("found admin")
          
          res.render('admin_login',{verify:1});
        }
        else  // if no such user
        {

          res.render('admin_login',{verify:0});
          console.log("not found")
        }
        
    }
})

})

app.get('/user',(req,res)=>{ // display login for normal users

  res.render('user_login',{verify:-1});
})

app.post('/user',(req,res)=>{ // accept POST data for normal users
  var userId = req.body.userId;
  var password = req.body.password;
  console.log(userId);
  console.log(password);


  usersData.findOne({userId:userId,password:password},function(err,founduser){ // find if such an user exist
    if(err){
        res.send(err);
        console.log("error");
    }else{
        if(founduser) // if user is found
        {   
          verify=1;
          console.log("found user");
          res.render('user_login',{verify:1});
        }
        else   // if no such user found
        {
          console.log("not found");
          res.render('user_login',{verify:0});
          console.log(userId);
          console.log(password);
        }
        
    }
})

});

const PORT = process.env.PORT || 8000; // start the server at PORT 8000 if local

app.listen(PORT, () => {
  console.log('Example app listening on port 8000!') // start the server
});