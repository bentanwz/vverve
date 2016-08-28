var LocalStrategy = require("passport-local").Strategy;

var mysql = require("mysql");
var async = require("async");

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "j040606b",
    database: "vverve",
    connectionLimit: 4
});

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, authenticate));

};

const adminAuth = "SELECT password from admin where email=?";
const memberAuth = "SELECT password from members where email=?";



   
    function authenticate(username, password, done){

        pool.getConnection(function (err, connection) {
            if(err){
                console.info(err);
            }
            console.log(adminAuth);

            async.waterfall([

                function(callback){
                    console.info(username);
                    connection.query(adminAuth, [username],
                        function (err,result) {
                            if(err){
                                return done(null, false);
                                console.log(err);
                            }
                            if(result[0]['password'] == password){
                                valid= true;
                                callback(null, username);
                            }else{
                                return done(null, false);
                            }
                        }
                    )
                },

                function(result, callback){
                    console.info("members checking..");
                    if(!valid){
                        connection.query(memberAuth, [username],
                            function (err, result) {
                                connection.release();
                                if (err) {
                                    console.log(err);
                                    return done(null, false);
                                }
                                console.log("m"+result);

                                if (result[0]['password'] == password) {
                                    valid = true;
                                    callback(null, username);
                                }else{
                                    return done(null, false);
                                }
                            }
                        )
                    }else{
                        callback(null, result);
                    }
                }
            ], function(err, data){
                if(err){
                    return done(null, false);
                }
                console.info("Prepare to serialize to session ..." + data);
                return done(null, data)
            });
        });


        // done(error, result);
//     if(valid){
//         return done(null, username);
//     }
//

    }
    var valid = false;
