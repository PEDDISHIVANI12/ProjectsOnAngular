const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("The server started on port 3001 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>heyy there!! this is a mail sending app!!<br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});


app.post("/sendmailv", (req, res) => {
  console.log("request received");
  let user = req.body;
  sendMail(user, forward => {
    console.log(`The mail has been sent 😃 and the id is ${forward.messageId}`);
    res.send(forward);
});

});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transport = nodemailer.createTransport({
    //Service : "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

let volunteers = {
    from: '"Edunate Admin"<admin@edunate.com>', // sender address
    to: user.email, // list of receivers
    subject: "Acknowledgement", // Subject line
    html: `<h1>Hello !!1 Hope this mail finds you hale and hearty!</h1><br>
    <h2>A user with the following details and message contacted us:</h2>
    <h3>Name: ${user.name}<br/>
        Email: ${user.email}<br/>
        Thank you for taking the time to consider LAUNDRY.After reviewing the application received ,
        yours was not selected for further consideration.
        The selection committee appreciates the time you invested in your application.`
      };
let forward = await transport.sendMail(volunteers);
callback(forward);
}