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
  let newArr = [];
  async function getNetworksandNames() {
      const response = await merakiNetworks
      const data = await response
     return exececuteGetNetworksandNames(data);
    //   data.forEach(function(data) {
    //       const name = data.name
    //       const id = data.id
    //       newArr.push(name, id)
    //       console.log(newArr)
    //   })
  }
  
function exececuteGetNetworksandNames(data) {
    var newArr = [];
    data.forEach(function(res) {
        var id = res.id
        var name = res.name
        newArr.push({id, name})
        

    })
    console.log(newArr)
}

getNetworksandNames();
//     .then(function(res) {
   
// res.forEach(function(data) {
//     console.log(data.id, data.name)
    
// })

//     })
    
//     .catch(e => console.log(e));



// Get DHCPHandling
// let networkId = 'N_651333096108460350';
// const promise = controller.getNetwork_vlans(networkId);
// promise.then((response) => {

//     response.forEach(function(response) {
//         var dhcpHandling = response.dhcpHandling;
//         console.log("Plano: " + dhcpHandling)
//     })
   
// },(err) => {
//     console.log(err)
// })


// Network Devices

// let params = [];
// let networkId = "N_651333096108465793"; // Sandbox Campus-SFO
// params["networkId"] = networkId;

// meraki.DevicesController.getNetworkDevices(networkId) 
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });




// Get Device Clients

// let params = {};
// let serial = 'Q2LD-UZYA-TWAA';

// params['serial'] = serial

// let timespan = '2000'
// params['timespan'] = timespan

// meraki.ClientsController.getDeviceClients(params)
// .then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err)
// })