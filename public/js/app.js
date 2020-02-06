// Dependencies
const meraki = require("meraki");

// Get Key
const key = require('./key')
const myKey = `${key.getKey()}`;

// Establish Connection to API
const configuration = meraki.Configuration;
configuration.xCiscoMerakiAPIKey = myKey;

// Getting data from multiple Endpoints.

// Store data




// Get Network Device Uplink
// let input  = {};
// let networkId = 'N_651333096108466003';
// input['networkId'] = networkId;

// let serial = 'Q2KN-6UJM-HHWM'
// input['serial'] = serial

// meraki.DevicesController.getNetworkDeviceUplink(input)
// .then(function(res) {
//     console.log(res)
// }).catch(e => console.log(e))



// All Network Locations
const params = {
    organizationId: "361444" // Meraki Launchpad Demo
  };

  const merakiNetworks = meraki.NetworksController.getOrganizationNetworks(params)
  
  
  
  async function getNetworksandNames() {
      const response = await merakiNetworks
      const data = await response
      const nameandId = [];
      data.forEach(function(res) {
        var id =  res.id
        var name =  res.name
        nameandId.push({id, name})

    })
   return nameandId
   

  }
async function run() {
    const data = await getNetworksandNames();
    console.log(data[1])
    // console.log(data)
}

run();
//   function exececuteGetNetworksandNames(data) {
    
//     data.forEach(function(res) {
//         var id = res.id
//         var name = res.name
//         newArr.push({id, name})
        

//     })
//     // console.log(newArr)
// }

// var result = getNetworksandNames();

// console.log(result)




// Network Devices

// function getSerial () {
//   let params = [];
// let networkId = "N_651333096108465793"; // Sandbox Campus-SFO
// params["networkId"] = networkId;

// meraki.DevicesController.getNetworkDevices(networkId) 
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });  
// }




