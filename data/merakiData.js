var merakiData = [
    {
    location: 'Corporate',
    WAN1: {
        status: 'Active',
        publicIp: '111.111.111',
        usingStaticIp: true
    },
    WAN2: {
        status: 'Ready',
        publicIP: '222.222.222',
        usingStaticIp: false
    }
},
{
    location: 'Corporate Guest',
    WAN1: {
        status: 'Active',
        publicIp: '333.333.333',
        usingStaticIp: false
    }
}
];

module.exports = merakiData;