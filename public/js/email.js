// var nodeoutlook = require('nodejs-nodemailer-outlook')  
const axios = require("axios");


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















