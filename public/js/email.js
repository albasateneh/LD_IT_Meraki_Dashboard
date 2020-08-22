const axios = require("axios");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sam.albasateneh@gmail.com',
    pass: 'meteora!'
  }
})
console.log('created')
var mailOptions = {
  from: 'sam.albasateneh@gmail.com',
  to: 'salbasateneh@lazydogrestaurants.com',
  subject: 'TEST',
  text: 'test'
}

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  }
  else {
    console.log('Email sent: ' + info.response);
  }
})



const baseURL = "http://localhost:8080"
var temp = [];

axios.get(baseURL + "/api/data")
  .then(function (response) {
    var resData = response.data

    resData.forEach(function (res) {
      var str = res[2].name
      var interface = res[1].interface
      var status = res[1].status
      if (res[1].status != "Ready" && !str.includes("GUEST") && !str.includes("Guest") && res[1].status != "Active") {
        console.log(res[2].name + " | " + res[1].interface + " " + res[1].status + ". ")
        temp.push({ str, interface, status })
      }
      return temp
    })
    console.log(temp)

  })
        // .catch(e => console.log(e))















