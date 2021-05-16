var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
mongo.set('useFindAndModify', false); 

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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4202');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({

  email: {
    type: String
  },
  username:{
    type: String
  },
  password: {
    type: String
  },
  count: {
    type: Number
  },

}, {
  versionKey: false
});


var model = mongo.model('admin', UsersSchema, 'admin');



app.post("/api/UpdateUser", function (req, res) {
  model.findByIdAndUpdate(req.body._id, {
    count:req.body.count,
    password:req.body.password,
    username:req.body.username,
    email:req.body.email
  },
  function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        data: "Your profile has been updated!"
      });
      console.log(req.body);
    }
  });
})


app.get("/api/getUser", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})



app.listen(8087, function () {

    console.log('Example app listening on port 8087!')
  })