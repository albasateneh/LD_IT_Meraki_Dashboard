// Dependencies
const meraki = require("meraki");

// Get Key
const key = require('./key')
const myKey = `${key.getKey()}`;

// Establish Connection to API
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
      data.forEach(function(res) {
        var id =  res.id
        var name =  res.name
        
        if (name.includes("LD")) {
          nameandId.push({id, name})
        }
        

    })
   return nameandId
   

  }
// ================================================================================
// Returns Network Array to use in getSerial
// ================================================================================

  async function run() {
    const data = await getNetworksandNames();
    let networkId = data; // Sandbox Campus-SFO
    // console.log(networkId)
    const temp = [];
  
    networkId.forEach(function(res) {
  temp.push(res.id)
  
    })
  return temp
  }


// ================================================================================
// Returns Serial for every device per NetworkID
// ================================================================================

  async function getSerial() {
    const networkArr = await run();

  for (const x of networkArr) {
        const result = await meraki.DevicesController.getNetworkDevices(x) 
        const data = await result
        console.log(data)
  }
    
  
  }
   
  getSerial();

// ================================================================================
// Merge Data Sets
// ================================================================================  

async function merge1() {

    // const data = await getNetworksandNames();
    // console.log(data)
    
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

merge1();
