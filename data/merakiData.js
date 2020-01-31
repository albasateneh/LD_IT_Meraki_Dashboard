var merakiData = [
    {
    name: 'Corporate',
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
    name: 'Corporate Guest',
    WAN1: {
        status: 'Active',
        publicIp: '333.333.333',
        usingStaticIp: false
    }
}
];

module.exports = merakiData;