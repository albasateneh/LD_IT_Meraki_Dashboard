var merakiData = require('../data/merakiData');
var clientData = require('../data/clientData')
module.exports = function(app) {
    app.get('/api/data', function(req, res) {
        res.json(merakiData);
    });

    app.post('/api/data', function(req, res) {
        merakiData.push(req.body)
    });

    app.get('/api/client', function(req, res) {
        res.json(clientData)
    });
    
    app.post('/api/client', function(req, res) {
        clientData.push(req.body)
    })
}