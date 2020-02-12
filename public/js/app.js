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
      const id = res.networkId;
      idAndSerial.push({serial, id})

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
    
// console.log(data)
// console.log(data2)
 
// const merge = (arr1, arr2) => {
// const temp = []

// arr1.forEach(x => {
//   arr2.forEach(y => {
//     if(x.id === y.id) {
//       temp.push({...x, ...y})

//     }
//   })
// })
// return temp
// }

// var newArray = merge(data, data2);
// console.log(newArray);

}

run();



// const merakiNetworks = meraki.NetworksController.getOrganizationNetworks(params)

// async function getNetworksandNames() {
//   const response = await merakiNetworks
//   const data = await response
//   const idArr = [];
//   data.forEach(function(res) {
//     var id =  res.id
//     idArr.push({id})

// })
// return idArr


// }

// async function run() {
// const data = await getNetworksandNames();
// let networkId = data; // Sandbox Campus-SFO
// // console.log(networkId)
// const temp = [];

// networkId.forEach(function(res) {
//   temp.push(res.id)
  
//     })
//     temp.forEach(function(res, i) {
//       setTimeout(() => {
//         meraki.DevicesController.getNetworkDevices(res) 
//         .then(res => {
//           res.forEach(function(result) {
//             var id = result.networkId
//             var serial = result.serial
//             console.log({id, serial})
//           })
//         })
//         .catch(err => {
//           console.log(err);
//         });
//       }, i * 200 ) 
    
//     })
  
//   }
  
//   run();


// async function run() {
//   const data = await getNetworksandNames();
//   let networkId = data; // Sandbox Campus-SFO
//   // console.log(networkId)
//   const temp = [];

//   networkId.forEach(function(res) {
// temp.push(res.id)

//   })
// return temp
// }


// async function getSerial() {
//   const networkArr = await run();
  
// for (const x of networkArr) {
//       const result = await meraki.DevicesController.getNetworkDevices(x) 
//       console.log(result)
// }
  

// }
 
// getSerial();