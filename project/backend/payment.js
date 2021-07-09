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
  orderdate:{
    type:String
  },
  fullname:{
    type:String
  },
  email:{
    type:String
  },
  address: {
    type: String
  },
  delidate:{
    type:String
  },
  pickup:{
    type:String
  },
  cus_id: {
    type: String
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  status:{
    type:String,
  },
  pnumber: {
    type: String,
  },
  zip: {
    type: String,
  },
  cname: {
    type: String,
  },
  ccnum: {
    type: String,
  },
  expmonth: {
    type: String,
  },
  expyear: {
    type: String,
  },
  cvv: {
    type: String,
  },
  paymentmode:{
    type: String,
  },
  order:{
    type: Array,
  },
  laundid:{
    type: String,
  },
  laundname:{
    type: String,
  },
  sum:{
    type: Number,
  },
  length:{
    type: Number,
  },
  status:{
    type:String,
  },

  
}, {
  versionKey: false
});


var model = mongo.model('payment', UsersSchema, 'payment');

app.post("/api/Payment", function (req, res) {
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

app.post("/api/UpdatePayment", function (req, res) {
  model.findByIdAndUpdate(req.body._id, {
    orderdate:req.body.orderdate,
    address: req.body.address,
    city: req.body.city,
    state:req.body.state,
    zip:req.body.zip,
    cname:req.body.cname,
    ccnum:req.body.ccnum,
    expmonth:req.body.expmonth,
    expyear:req.body.expyear,
    delidate:req.body.delidate,
    fullname:req.body.fullname,
    sum:req.body.sum,
    length:req.body.length,
    status:req.body.status,
    email:req.body.email,
    laundname:req.body.laundname,
    laundid:req.body.laundid,
    order:req.body.order,
    paymentmode:req.body.paymentmode,
    pnumber:req.body.pnumber,
    delidate:req.body.delidate,
    pickup:req.body.pickup,
    cus_id:req.body.cus_id,
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


app.listen(8091, function () {

    console.log('Example app listening on port 8091!')
  })