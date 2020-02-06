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



// Network Devices

 async function getSerial () {
    const useId = await run();
// console.log(useId[11])

  
    useId.forEach(function(res) {
      meraki.DevicesController.getNetworkDevices(res) 
     
    })
       
    
    
    
}


// Run All Api endpoints
async function run() {
    const data = await getNetworksandNames();
    const onlyIds = []
data.forEach(function(res) {
    const results = res.id
    onlyIds.push(results);
})
return onlyIds;
}

run();
getSerial();




