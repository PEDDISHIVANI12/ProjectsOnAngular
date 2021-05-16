var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
const { encrypt, decrypt } = require('./crypto');
var db = mongo.connect("mongodb://localhost:27017/LaundryMangagement", function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ' + db, ' + ', response);
  }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  
  FirstName: {
    type: String
},
  LastName: {
    type: String,
}, 
  email: {
    type: String,
    unique:true
  },
  password: {
    type: String,
  },
  secans: {
    type: String
  },
  secques: {
    type: String
  },
 

}, {
  versionKey: false
});


var model = mongo.model('users_customer', UsersSchema, 'users_customer');


app.get("/api/getUser_admin", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})


app.listen(8080, function () {

    console.log('Example app listening on port 8080!')
  })