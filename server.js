// Dependencies
var express = require('express');

// Express Configuration
//============================================
var app = express();
var PORT = process.env.PORT || 3000;

// Data Parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Allow Express to serve Static Files
app.use(express.static("public"));
//============================================

// Router


// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
