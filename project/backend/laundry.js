var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
mongo.set('useFindAndModify', false); 
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
  const allowedOrigins = ['http://localhost:4200', 'http://localhost:4202'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
 // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({

  FirstName_laun: {
    type: String
  },
  LastName_laun: {
    type: String,
  },
  comname: {
    type: String,
    unique:true
  },
  email_forgot: {
    type: String,
  },
  email_laundry: {
    type: String
  },
  pnumber: {
    type: String
  },
  add1: {
    type: String
  },
  add2: {
    type: String
  },
  pincode: {
    type: String
  },
  secans_laundry: {
    type: String
  },
  secques_laun: {
    type: String
  },
  district: {
    type: String
  },
  state: {
    type: String
  },
  status:{
    type: String
  },
  password:{
    type:String
  },

}, {
  versionKey: false
});


var model = mongo.model('users_laundry', UsersSchema, 'users_laundry');

app.post("/api/SaveUser", function (req, res) {
  var mod = new model(req.body);
  model.findOne({email_laundry:req.body.email_forgot}, function (err, data) {
    if (err) {
      res.send({
        data: "username already exists"
      });
    }
    else if (data){
      res.send({
        data: "You have already registered."
      });
    } else {
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

app.post("/api/UpdateUser", function (req, res) {
  model.findByIdAndUpdate(req.body._id, {
    FirstName_laun: req.body.FirstName_laun,
    LastName_laun: req.body.LastName_laun,
    email_laundry:req.body.email_laundry,
    password: req.body.password,
    add1:req.body.add1,
    add2:req.body.add2,
    district:req.body.district,
    state:req.body.state,
    secans_laundry:req.body.secans_laundry,
    secques:req.body.secques,
    status:req.body.status,
    pincode:req.body.pincode,
    comname:req.body.comname,
    pnumber:req.body.pnumber
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

app.post("/api/isPresent", function (req, res) {
  model.findOne({email_laundry:req.body.email_forgot}, function (err, data) {
    console.log(data);
    if (data) {
      res.send({
        data
      });
    } 
  });
})

app.post("/api/islogin", function (req, res) {
  model.find({email_laundry:req.body.email,password:req.body.password,secques_laun:req.body.secques,secans_laundry:req.body.secans }, function (err, data) {
    console.log(data);
    if (data) {
      res.send({
        data
      });
    } 
  });
})

app.post("/api/deleteUser", function (req, res) {
  model.remove({
    _id: req.body.id
  }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        data: "Record has been Deleted..!!"
      });
    }
  });
})

app.listen(8082, function () {

    console.log('Example app listening on port 8082!')
  })