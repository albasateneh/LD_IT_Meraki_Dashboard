var path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"))
    });

    // app.get("/email", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/email.html"))
    // })
};