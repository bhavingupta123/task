const express = require('express')
const app = express();
const http = require('http');
const path = require('path');

const router = express.Router()

//const fetch = require('node-fetch');
const mongoose = require('mongoose')
//const axios = require("axios");
//const bodyparser = require('body-parser')

app.use(express.static(path.join(__dirname, 'views')));

app.set('views','views')
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: false }))

const adminData = require('./models/admin_data');
const usersData = require('./models/users_data');


mongoose.connect('mongodb://103.86.177.201:32768/task', {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected')
})
.catch(err => console.log(err))

app.get('/',(req,res)=>{

    res.render("index");
});

app.get('/admin',(req,res)=>{

  res.render('admin_login',{verify:-1});
});

app.post('/admin',(req,res)=>{
  var userId = req.body.userId;
  var password = req.body.password;
  console.log(userId);
  console.log(password)


  adminData.findOne({userId:userId,password:password},function(err,founduser){
    if(err){
        res.send(err);
        console.log("error")
    }else{

        if(founduser)
        {   
          verify=1;
          console.log("found admin")
          
          res.render('admin_login',{verify:1});
        }
        else
        {

          res.render('admin_login',{verify:0});
          console.log("not found")
        }
        
    }
})

})

app.get('/user',(req,res)=>{

  res.render('user_login',{verify:-1});
})

app.post('/user',(req,res)=>{
  var userId = req.body.userId;
  var password = req.body.password;
  console.log(userId);
  console.log(password);


  usersData.findOne({userId:userId,password:password},function(err,founduser){
    if(err){
        res.send(err);
        console.log("error");
    }else{
        if(founduser)
        {   
          verify=1;
          console.log("found user");
          res.render('user_login',{verify:1});
        }
        else
        {
          console.log("not found");
          res.render('user_login',{verify:0});
          console.log(userId);
          console.log(password);
        }
        
    }
})

});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Example app listening on port 8000!')
});