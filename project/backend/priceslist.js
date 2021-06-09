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
  laund_id:{
    type:String
  },
  wasshirt: {
    type: Number
  },
  wastie: {
    type: Number
  },
  wasblazer: {
    type: Number
  },
  waspant: {
    type: Number
  },
  wassuit: {
    type: Number
  },
  wasjeans: {
    type: Number
  },
  ironshirt: {
    type:Number
  },
  irontie: {
    type: Number
  },
  ironblazer: {
    type: Number
  },
  ironpant: {
    type: Number
  },
  ironjeans: {
    type: Number
  },
  ironsuit: {
    type: Number
  },
  waishi: {
    type:Number
  },
  waitie: {
    type:Number
  },
  waiblazer: {
    type: Number
  },
  waipant: {
    type:Number
  },
  waijeans:{
    type: Number
  },
  waisuits:{
    type:Number
  },
  dryshirts: {
    type:Number
  },
  drytie: {
    type:Number
  },
  dryblazer: {
    type: Number
  },
  drypant: {
    type: Number
  },
  dryjeans: {
    type:Number
  },
  drysuit:{
    type: Number
  },
  status:{
    type: String
  },

}, {
  versionKey: false
});


var model = mongo.model('laundry_price', UsersSchema, 'laundry_price');

app.post("/api/SavePrices", function (req, res) {
  var mod = new model(req.body);
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
  }})
})
     

app.post("/api/UpdateUser", function (req, res) {
  model.findByIdAndUpdate(req.body._id, {
    laund_id :req.body.laund_id,
    wasshirt: req.body.wasshirt,
    wastie: req.body.wastie,
    wasblazer:req.body.wasblazer,
    waspant: req.body.waspant,
    wasjeans:req.body.wasjeans,
    ironshirt:req.body.ironshirt,
    irontie:req.body.irontie,
    ironblazer:req.body.ironblazer,
    ironpant:req.body.ironpant,
    ironjeans:req.body.ironjeans,
    ironsuit:req.body.ironsuit,
    waishi:req.body.waishi,
    waitie:req.body.waitie,
    waiblazer:req.body.waiblazer,
    waipant:req.body.waipant,
    waijeans:req.body.waijeans,
    dryshirts:req.body.dryshirts,
    drytie:req.body.drytie,
    dryblazer:req.body.dryblazer,
    drypant:req.body.drypant,
    dryjeans:req.body.dryjeans,
    drysuit:req.body.drysuit,
    status:req.body.status,
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

app.post("/api/getPrices", function (req, res) {
  model.findOne({laund_id:req.body.id}, function (err, data) {
    console.log(data);
    if (data) {
      res.send({
        data
      });
    } 
  });
})


app.listen(8083, function () {

    console.log('Example app listening on port 8083!')
  })