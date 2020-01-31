const meraki = require("meraki");
const configuration = meraki.Configuration;
const key = require('./key')
const myKey = `${key.getKey()}`;
console.log(myKey)
configuration.xCiscoMerakiAPIKey = myKey;


// meraki.OrganizationsController.getOrganizations().then(function (res) {
//     console.log(res)})
//         .catch(e => console.log(e));
 
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
// newObj = []
// const params = {
//     organizationId: "361444" // Meraki Launchpad Demo
//   };
//   meraki.NetworksController.getOrganizationNetworks(params)
//     .then(function(res) {
//      console.log(res)


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

let params = [];
let networkId = "N_651333096108465793"; // Sandbox Campus-SFO
params["networkId"] = networkId;

meraki.DevicesController.getNetworkDevices(networkId) 
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });




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