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
  
  const getOrgDevs = meraki.DevicesController.getOrganizationDevices(params)

  async function gettingOrgDevs() {
    const response = await getOrgDevs;
    const data = await response;
    const idAndSerial = [];
    data.forEach(function(res) {
      const serial = res.serial;
      const network = res.networkId;
      idAndSerial.push({serial, network})

    })
    return idAndSerial;
  }


  
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



// Run All Api endpoints
// Loop through objects and when id's match, create new object with name, serial, and id
async function run() {

    const data = await getNetworksandNames();
    const data2 = await gettingOrgDevs();
    
console.log(data[0])
console.log(data2[0])
 
var newArray = [];


}
run();
// gettingOrgDevs();



