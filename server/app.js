var express = require('express');
var bodyParser = require("body-parser");
var morgan = require('morgan');

// var webhook = require('express-ifttt-webhook');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(webhook());

require("./auth")(app);
require("./routes")(app);



app.listen(3000, function () {
    console.log('Express server listening on %d', 3000);
});
app.use(require('connect-livereload')());



// Expose app
exports = module.exports = app;