// ================================================================================
// Dependencies
// ================================================================================
var express = require('express');
const meraki = require("meraki");
const axios = require("axios");

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
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

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

// ================================================================================
// Post to Server
// ================================================================================  

const baseURL = "http://localhost:8080"

async function dataSet() {
  const data = await printAll();
  console.log(data)
  console.log("Posting........")
  axios.post(baseURL + '/api/data', data)
    // .catch(e => console.log(e))
}

dataSet();

async function clientSet() {
  const data = await clients()
  console.log("Posting..........")
  axios.post(baseURL + "/api/client", data)
}

clientSet();

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
