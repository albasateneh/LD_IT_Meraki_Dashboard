console.log("Key loaded")
require("dotenv").config(); 


const getKey = () => {
    return process.env.Meraki_Key;
}

exports.getKey = getKey;