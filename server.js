// ================================================================================
// Dependencies
// ================================================================================
var express = require('express');
const meraki = require("meraki");
const axios = require("axios");
var nodeoutlook = require('nodejs-nodemailer-outlook')

const dotenv = require('dotenv');
dotenv.config();

// ================================================================================
// Get Key
// ================================================================================

const key = require('./public/js/key')
const myKey = `${key.getKey()}`;


// Express Configuration
//============================================
var app = express();
var PORT = 8080;

// Data Parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Allow Express to serve Static Files
app.use(express.static("public"));
//============================================

// Router
require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app);


// ================================================================================
// Establish Connection to API
// ================================================================================

const configuration = meraki.Configuration;
configuration.xCiscoMerakiAPIKey = myKey;

// ================================================================================
// GLOBAL VARIABLES
// ================================================================================

const params = {
  organizationId: "361444" // Meraki Launchpad Demo
};

const merakiNetworks = meraki.NetworksController.getOrganizationNetworks(params)

// ================================================================================
// Returns Networks and Names
// ================================================================================


async function getNetworksandNames() {
  const response = await merakiNetworks
  const data = await response
  const nameandId = [];
  data.forEach(function (res) {
    var networkId = res.id
    var name = res.name

    if (name.includes("LD")) {
      nameandId.push({ networkId, name })
    }


  })
  return nameandId


}
// ================================================================================
// Returns Network Array to use in getSerial
// ================================================================================

async function run() {
  const data = await getNetworksandNames();
  let networkID = data; // Sandbox Campus-SFO
  // console.log(networkId)
  const temp = [];

  networkID.forEach(function (res) {
    temp.push(res.networkId)

  })
  return temp
}


// ================================================================================
// Returns Serial for every device per NetworkID
// ================================================================================

async function getSerial() {
  const networkArr = await run();
  const temp = []
  var temp2 = []
  for (const x of networkArr) {
    const result = await meraki.DevicesController.getNetworkDevices(x)
    const data = await result

    for (const y of data) {
      temp.push(y)
    }
  }
  temp.forEach(function (res) {
    var networkId = res.networkId;
    var serial = res.serial;
    temp2.push({ networkId, serial })

  })
  return temp2

}

// ================================================================================
// Get Device Uplink
// ================================================================================  

async function deviceUplink() {
  const input = await getSerial();
  const temp = [];

  for (const x of input) {
    const result = await meraki.DevicesController.getNetworkDeviceUplink(x)
    const data = await result
    temp.push(data)
  }
  // return temp.length
  return temp
}

// ================================================================================
// Get Clients
// ================================================================================  

const clientController = meraki.ClientsController;

async function clients() {
  const networks = await getNetworksandNames();
  const temp = []
  const temp2 = []
  networks.forEach(function (res) {
    var networkId = res.networkId;
    var perPage = 100;
    temp.push({ networkId, perPage })
  })
  for (const x of temp) {
    const result = await clientController.getNetworkClients(x)
      .catch(e => console.log(e))
    const data = await result
    // console.log(data.length)
    temp2.push(data)
  }
  return temp2;
}

// ================================================================================
// Merge Data Sets
// ================================================================================  

async function merge1() {

  const data = await getNetworksandNames();
  const data2 = await getSerial();

  // console.log(data)
  // console.log(data2)

  const merge = (arr1, arr2) => {
    const temp = []

    arr1.forEach(x => {
      arr2.forEach(y => {
        if (x.networkId === y.networkId) {
          temp.push({ ...x, ...y })

        }
      })
    })
    return temp
  }

  var newArray = merge(data, data2);
  //  return newArray.length
  return newArray

}

async function printAll() {
  const merging = await merge1();
  const uplinking = await deviceUplink();
  // console.log(merging);
  // console.log(uplinking);
  const temp = []
  uplinking.forEach(function (res, index) {
    merging.forEach(function (res2, index2) {
      if (index === index2) {
        res.push(res2)
        temp.push(res)
      }

    })

  })
  return temp;

}

async function merge2() {
  const initData = await printAll();
  const clientData = await clients();
  const temp = [];
  initData.forEach(function (res, index) {
    clientData.forEach(function (res2, index2) {
      if (index === index2) {
        res.push(res2)
        temp.push(res)
      }
    })
  })
  return temp;


}

// ================================================================================
// Create Email Notification
// ================================================================================ 

function runEmailAuto() {

  axios.get(baseURL + "/api/data")
    .then(function (response) {
      var resData = response.data
      var temp = [];

      resData.forEach(function (res) {
        var str = res[2].name
        var interface = res[1].interface
        var status = res[1].status
        if (res[1].status != "Ready"  && !str.includes("GUEST") && !str.includes("Guest") && res[1].status != "Active") {
          // console.log(res[2].name + " | " + res[1].interface + " " + res[1].status + ". ")
          temp.push({ str, interface, status })
        }
        return temp
      })
      // console.log(temp)
      if (temp.length == 0) {
        nodeoutlook.sendEmail({
          auth: {
            user: process.env.email,
              pass: process.env.notEmailPW
          },
          from: process.env.email,
          to: process.env.myEmailUN,
          subject: 'Store Meraki [WAN 2] All Stores Online ',
          text: 'All Stores Online ',
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(i)
        })
      } else {
        temp.forEach(function (res) {
          console.log(res.str + " | " + res.interface + " " + res.status)
          nodeoutlook.sendEmail({
            auth: {
              user: process.env.email,
              pass: process.env.notEmailPW
            },
            from: process.env.email,
            to: process.env.myEmailUN,
            subject: 'Alert for ' + res.str + ' - ' + res.interface + ' ' + res.status,
            text: 'Store Meraki: ' + res.interface + " " + res.status,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
          })
  
        })
      }
   


    })

  axios.get(baseURL + "/api/data")
    .then(function (response) {
      var resData2 = response.data
      var temp2 = [];
      resData2.forEach(function (res2) {
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
            user: process.env.email,
              pass: process.env.notEmailPW
          },
          from: process.env.email,
          to: process.env.myEmailUN,
          subject: 'Store Meraki [WAN 1] All Stores Online',
          text: 'All Stores Online ',
          onError: (e) => console.log(e),
          onSuccess: (i) => console.log(i)
        })
      } else {
        temp2.forEach(function (res) {
          console.log(res.str + " | " + res.interface + " " + res.status)
          nodeoutlook.sendEmail({
            auth: {
              user: process.env.email,
              pass: process.env.notEmailPW
            },
            from: process.env.email,
            to: process.env.myEmailUN,
            subject: 'Alert for ' + res.str + ' - ' + res.interface + ' ' + res.status,
            text: 'Store Meraki: ' + res.interface + " " + res.status,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
          })
  
        })
      }
  
    })

}

// ================================================================================
// Post to Server
// ================================================================================  

const baseURL = "http://localhost:8080"

async function dataSet() {
  const data = await merge2();
  console.log("Posting........")
  console.log(data)
  console.log("Posted!")
  axios.post(baseURL + '/api/data', data)
  runEmailAuto();
  // .catch(e => console.log(e))
}

// ================================================================================
// Set Interval to continuosly clear and update data
// ================================================================================ 

function clearData() {
  setInterval(function () {
    console.log("clearing.....")
    axios.post(baseURL + '/api/clear')
    dataSet();
    // location.reload()
  }, 900000)
}


clearData();



// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
