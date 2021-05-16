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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
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
  email_cus: {
    type: String,
  },
  password_cus: {
    type: String,
  },
  secans_cus: {
    type: String
  },
  secques: {
    type: String
  },
 

}, {
  versionKey: false
});


var model = mongo.model('users_customer', UsersSchema, 'users_customer');

app.post("/api/SaveUser_customer", function (req, res) {
  var mod = new model(req.body);
  model.findOne({email_cus:req.body.email_cus}, function (err, data) {
    if (err) {
      res.send({
        data: "Username already exists"
      });
    }
    else if (data){
      res.send({
        data: "You have already registered."
      });
    }else {
      mod.save(function (err, data) {
        console.log(req.body);
        if (err) {
          res.send({
            data: "Username already exists"
          });
        } else {
          res.send({
            data: "Registered successfully!"
          });
        }
      });
    }
  });
})


app.post("/api/isPresent", function (req, res) {
  model.findOne({email_laundry:req.body.email_forgot}, function (err, data) {
    console.log(data);
    if (data) {
      res.send({
        data: "Exists"
      });
    } 
  });
})


app.post("/api/islogin", function (req, res) {
  model.find({email_cus:req.body.email,password_cus:req.body.password,secques:req.body.secques,secans_cus:req.body.secans }, function (err, data) {
    console.log(data);
    if (data) {
      res.send({
        data
      });
    } 
  });
})

app.get("/api/getUser_customer", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})


app.listen(8081, function () {

    console.log('Example app listening on port 8081!')
  })