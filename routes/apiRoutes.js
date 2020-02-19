var merakiData = require('../data/merakiData');

module.exports = function(app) {
    app.get('/api/data', function(req, res) {
        res.json(merakiData);
    });

    app.post('/api/data', function(req, res) {
        merakiData.push(req.body)
    })
}