var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./auth")(app);

app.listen(3000, function () {
    console.log('Express server listening on %d', 3000);
});

// Expose app
exports = module.exports = app;