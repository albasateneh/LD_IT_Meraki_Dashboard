const dotenv = require('dotenv');
dotenv.config();
console.log(`Your pw is ${process.env.notEmailPW}`)


const axios = require("axios");
var nodeoutlook = require('nodejs-nodemailer-outlook')

const baseURL = "http://localhost:8080"

function run() {

  axios.get(baseURL + "/api/data")
  .then(function (response) {
    var resData = response.data
    var resData2 = response.data
    var temp = [];
    var temp2 = [];
resData2.forEach(function(res2) {
  var str = res2[2].name
  var interface = res2[0].interface;
  var status = res2[0].status
  if (res2[0].status != "Ready" && !str.includes("GUEST") && !str.includes("Guest") && res2[0].status != "Active") {
          // console.log(res[2].name + " | " + res[1].interface + " " + res[1].status + ". ")
          temp2.push({ str, interface, status })
        }
        return temp2
      })
      // console.log(temp)
      if (temp2.length == 0) {
        nodeoutlook.sendEmail({
          auth: {
            user: "notifications@lazydogrestaurants.com",
              pass: ""
          },
          from: 'notifications@lazydogrestaurants.com',
          to: 'salbasateneh@lazydogrestaurants.com',
          subject: 'Alert: WAN 1 Connected @ All Locations',
          text: 'Alert: All Stores Online ',
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(i)
        })
      } else {
        temp2.forEach(function (res) {
          console.log(res.str + " | " + res.interface + " " + res.status)
          nodeoutlook.sendEmail({
            auth: {
              user: "notifications@lazydogrestaurants.com",
              pass: ""
            },
            from: 'notifications@lazydogrestaurants.com',
            to: 'salbasateneh@lazydogrestaurants.com',
            subject: 'Alert for ' + res.str + ' - ' + res.interface + ' ' + res.status,
            text: res.interface + " " + res.status,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
          })
       
        })
      }
     
    })

    axios.get(baseURL + "/api/data")
    .then(function (response) {
      var resData = response.data
      var temp = [];
    resData.forEach(function (res) {
      var str = res[2].name
      var interface = res[1].interface
      var status = res[1].status
      
      if (res[1].status != "Ready" && !str.includes("GUEST") && !str.includes("Guest") && res[1].status != "Active") {
        // console.log(res[2].name + " | " + res[1].interface + " " + res[1].status + ". ")
        temp.push({ str, interface, status })
        return temp
      }
     
    
    })
    // console.log(temp)
    if (temp.length == 0) {
      nodeoutlook.sendEmail({
        auth: {
          user: "notifications@lazydogrestaurants.com",
            pass: ""
        },
        from: 'notifications@lazydogrestaurants.com',
        to: 'salbasateneh@lazydogrestaurants.com',
        subject: 'Alert: WAN 2 Connected @ All Locations ',
        text: 'Alert: All Stores Online ',
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
      })
    } else {
      temp.forEach(function (res) {
        console.log(res.str + " | " + res.interface + " " + res.status)
        nodeoutlook.sendEmail({
          auth: {
            user: "notifications@lazydogrestaurants.com",
              pass: ""
          },
          from: 'notifications@lazydogrestaurants.com',
          to: 'salbasateneh@lazydogrestaurants.com',
          subject: 'Alert for ' + res.str + ' - ' + res.interface + ' ' + res.status,
          text: 'Store Meraki ' + res.interface + " " + res.status,
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(i)
        })
     
      })
    }
  

  })
  

}

run()













