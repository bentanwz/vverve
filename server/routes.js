

var passport = require("passport");
var express = require('express');
var randomstring = require("randomstring");
var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "j040606b",
    database: "vverve",
    connectionLimit: 4
});

var api_key = 'key-f9a71f478f790db1db90b8bd8a6f5fbd';
var domain = 'sandbox82cdc0f20d7d47eabf075141afb3bce8.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


module.exports = function(app){

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/status/201",
        failureRedirect: "/status/403"
    }));

    app.post("/admin/login", passport.authenticate("local", {
        successRedirect: "/status/201",
        failureRedirect: "/status/403"
    }));

    app.get("/status/:code", function (req, res) {
        var code = parseInt(req.params.code);
        res.status(code).end();
    });

    app.post("/webhook/event", function (req, res) {
        console.log("Webhook works");
        console.log(req.params.from);
        console.log(req.params.to);
        res.status(200).end();
    });

    console.info("PublicDirectory is", (__dirname + "/../client"));
    app.use(express.static(__dirname + "/../client/"));
    
    app.get("/login.html",function (req,res) {
       res.redirect("login/login.html") 
    });

    const insert = "insert into prospects (first_name, last_name, nric, email, profession, profile, status) values (?, ?, ?, ?, ?, ?, ?)";

    app.post("/api/prospect/save",function (req,res) {

        pool.getConnection(function (err,connection) {
            if(err){
                console.info("hi");
                console.info(err);
                res.status(500).end();
                return;

            }
            var prospect = {};
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var nric = req.body.nric;
            var email = req.body.email;
            var profession = req.body.profession;
            var profile = req.body.profile;
            var status = 1;

            // console.log(req);
            // console.log(req.body.nric);

            console.log(prospect);

            connection.query(insert,
                [firstname, lastname, nric, email, profession, profile, status],
                function (err, result) {
                    connection.release();
                    if(err){
                        console.log(err);
                        res.status(500).end();
                        return;
                    }
                    console.log(result);
                    res.status(202).end();
                });
        });

    });

    const select_prospect_by_status = "select * from prospects where status=1";

    app.get("/api/prospect/verify", function (req,res,next) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.info("hi");
                console.info(err);
                res.status(500).end();
                return;

            }
            var prospect = {};

            console.log(prospect);

            connection.query(select_prospect_by_status,
                [],
                function (err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }
                    console.log(result);
                    res.status(202).json(result);
                });
        });
    });
    
    const prospectList = "select * from prospects";

    app.get("/api/prospects", function (req,res,next) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.info("hi");
                console.info(err);
                res.status(500).end();
                return;

            }
            var members = {};

            console.log(members);

            connection.query(prospectList,
                [],
                function (err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }
                    console.log(result);
                    res.status(202).json(result);
                });
        });
    });
    
    const membersList = "select * from members order by dateJoined desc";

    app.get("/api/members", function (req,res,next) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.info("hi");
                console.info(err);
                res.status(500).end();
                return;

            }
            var members = {};

            console.log(members);

            connection.query(membersList,
                [],
                function (err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }
                    console.log(result);
                    res.status(202).json(result);
                });
        });
    });

    const update_prospect_status = "UPDATE prospects SET status=?, auth_code=? WHERE id=?";
    
    app.post("/api/prospect/verifyOk/:id", function (req,res) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.info("hi");
                console.info(err);
                res.status(500).end();
                return;

            }
            console.info(req);
            var id = req.params.id;
            var auth_code = randomstring.generate(15);
            // console.log();
            console.log(id);

            connection.query(update_prospect_status,
                ['2', auth_code, id],
                function (err, result) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }

                    var data = {
                        from: 'Excited User <me@samples.mailgun.org>',
                        to: 'bentanwz@gmail.com',
                        subject: 'Welcome to Verve ',
                        text: 'Here your Authorization Code for Account Registration: ' + auth_code
                    };

                    mailgun.messages().send(data, function (error, body) {
                        console.log(body);
                    });
                    console.log(result);
                    res.status(202).end();
                })

        });
    });
    
    const insert_new_member = "INSERT into members (nric, email, password, dateJoined, first_name, last_name, profession, profile)" +
        " values (?, ?, ?, ?, ?, ?, ?, ?)";
    const member_auth_code = "select count(*) as cnt from prospects where auth_code=?";
    
    app.post("/api/member/save", function (req,res,next) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.info("hi");
                console.info(err);
                res.status(500).end();
                return;

            }
            var member = {};
            var nric = req.body.nric;
            var email = req.body.email;
            var password = req.body.password;
            var auth_code = req.body.authCode;
            var dateJoined = new Date();
            console.log(auth_code);



            connection.query(member_auth_code,
            [auth_code], function (err,result) {
                    console.log(result);
                    console.log(err);
                    console.log(result[0]["cnt"]);
                   if(result[0]["cnt"] > 0) {
                       connection.query(insert_new_member,
                           [nric, email, password, dateJoined,'','','',''],
                           function (err, result) {
                               connection.release();
                               if (err) {
                                   console.log(err);
                                   res.status(500).end();
                                   return;
                               }

                               var data = {
                                   from: 'Excited User <me@samples.mailgun.org>',
                                   to: 'bentanwz@gmail.com',
                                   subject: 'VERVE Family ',
                                   text: 'Congratulations!'
                               };

                               mailgun.messages().send(data, function (error, body) {
                                   console.log(body);
                               });
                               console.log(result);
                               res.status(202).end();
                           })
                   }else{
                       console.log(err);
                       res.status(500).end();
                   }
                })



        });

        
    });

    // app.post("/api/register/new", RegApi.create);


    // app.get("/api/doctors/create", DoctorApi.create);
    // app.get("/api/doctors/update", DoctorApi.update);
    // app.get("/api/doctors/remove", DoctorApi.remove);
    // app.get("/api/doctors/list", DoctorApi.list);
    //
    // app.get("/api/prescriptions/list", PrescriptionApi.list);
    // app.get("/api/prescriptions/list", PrescriptionApi.list);
    // app.get("/api/prescriptions/list", PrescriptionApi.list);
    //
    // app.get("/api/users/list", UserApi.list);
    // app.get("/api/users/list", UserApi.list);
    // app.get("/api/users/list", UserApi.list);
    // app.get("/api/users/list", UserApi.list);
    //
    // app.get("/api/ratings/list", RatingApi.list);
    // app.get("/api/ratings/list", RatingApi.list);
    // app.get("/api/ratings/list", RatingApi.list);
    // app.get("/api/ratings/list", RatingApi.list);
};
