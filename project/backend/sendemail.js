const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3007, () => {
  console.log("The server started on port 3007 !!!!!!");
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
    from: '"Laundry Admin"<admin@laundry.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Order details', // Subject line
    html: `<body style="background-color:white;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
    <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px blue;">
      <thead>
        <tr>
          <th style="text-align:left;"><img style="max-width: 150px;" src="/home/shivani/Desktop/project/src/assets/img/logo/logo.png" alt="Softwash"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="height:35px;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
            <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">Success</b></p>
            <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order amount</span> Rs.${user.message.sum}</p>
          </td>
        </tr>
        <tr>
          <td style="height:35px;"></td>
        </tr>
        <tr>
          <td style="width:50%;padding:20px;vertical-align:top">
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${user.message.fullname}</p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> ${user.email}</p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span>${user.message.pnumber}</p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">ID</span> ${user.message.cus_id}</p>
          </td>
          <td style="width:50%;padding:20px;vertical-align:top">
          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Date</span> ${user.message.orderdate}</p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Address</span> ${user.message.address}</p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Number of Items</span>${user.message.length}</p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Pickup Date</span> ${user.message.pickup} </p>
            <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Delievery Date</span> ${user.message.delidate} </p>

          </td>
        </tr>
      </tbody>
      <tr>
      <button><a href="http://localhost:4200">View your Orders</a></button>
      </tr>
      <tfooter>
        <tr>
          <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
            <strong style="display:block;margin:0 0 10px 0;">Regards</strong> Bachana Tours<br> Gorubathan, Pin/Zip - 735221, Darjeeling, West bengal, India<br><br>
            <b>Phone:</b> +91-9515780648<br>
            <b>Email:</b> contact@Laundry.in
          </td>
        </tr>
      </tfooter>
    </table>
  </body>`
};
let forward = await transport.sendMail(volunteers);
callback(forward);
}