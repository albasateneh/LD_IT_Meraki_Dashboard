const axios = require("axios");
var nodemailer = require('nodemailer');
var nodeoutlook = require('nodejs-nodemailer-outlook')
nodeoutlook.sendEmail({
  auth: {
    user: "salbasateneh@lazydogrestaurants.com",
    pass: "rvpzmdmqghrtpypn"
  },
  from: 'salbasateneh@lazydogrestaurants.com',
  to: 'salbasateneh@lazydogrestaurants.com',
  subject: 'hey',
  text: 'hey',
  onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
})
// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'sam.albasateneh@gmail.com',
//     pass: 'meteora!'
//   }
// })
// console.log('created')
// var mailOptions = {
//   from: 'sam.albasateneh@gmail.com',
//   to: 'salbasateneh@lazydogrestaurants.com',
//   subject: 'TEST',
//   text: 'test'
// }

// transporter.sendMail(mailOptions, function(error, info) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     console.log('Email sent: ' + info.response);
//   }
// })



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
    // console.log(temp)
    temp.forEach(function(res) {
      console.log(res.str + " | " + res.interface + " " + res.status)
      // var transporter = nodemailer.createTransport({
      //   service: 'Gmail',
      //   auth: {
      //     user: 'sam.albasateneh@gmail.com',
      //     pass: 'meteora!'
      //   }
      // })
      // let transporter = nodemailer.createTransport({
      //   service: "Outlook365",
      //   auth: {
      //     user: 'salbasateneh@lazydogrestaurants.com',
      //     pass: 'Welcome1'
      //   },    
      // })
      // console.log('created')
      // var mailOptions = {
      //   from: 'salbasateneh@lazydogrestaurants.com',
      //   to: 'salbasateneh@lazydogrestaurants.com',
      //   subject: res.str + " | " + res.interface + "  " + res.status,
      //   text: res.str + " | " + res.interface + "  " + res.status
      // }
      
      // transporter.sendMail(mailOptions, function(error, info) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // })
    })
    

  })
        // .catch(e => console.log(e))















