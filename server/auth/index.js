var session = require("express-session");
var passport = require("passport");
var local = require("./local");

module.exports = function (app) {
// Initialize session
    app.use(session({
        secret: "something-crypric",
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (username, done) {
        console.info("username > " + username);
        done(null, username)
    });

    passport.deserializeUser(function (username, done) {
        done(null, username);
    });

    local(passport);
};