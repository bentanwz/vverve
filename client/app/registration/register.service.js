
    angular
        .module("dow")
        .service("dbSvc", dbSvc);
    
    dbSvc.$inject = ["$http", "$q"];
    
    function dbSvc($http, $q) {
        
        var ctrl = this;
        
        ctrl.save = function (prospect) {
            
            var defer = $q.defer();
            console.log("nnnnn" + prospect);
            
            $http.post("api/prospect/save", prospect)
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err.status);
                });
            return defer.promise;
        };
        
        ctrl.prospect = function (prospect) {
            
            var defer = $q.defer();
            
            $http.get("api/prospect/verify", prospect)
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err.status);
                });
            return defer.promise;
        };
        
        ctrl.member = function (member) {
         
            var defer = $q.defer();

            console.log(member);
            
            $http.post("api/member/save", member)
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err.status);
                });
            return defer.promise;
        };
        
        ctrl.members = function (members) {
            
            var defer = $q.defer();

            $http.get("api/members", members)
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err.status);
                });
            return defer.promise;
        };
        
        ctrl.prospectsList = function (prospectsList) {
            
            var defer = $q.defer();

            $http.get("api/prospects", prospectsList)
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err.status);
                });
            return defer.promise;
        };
        
        ctrl.prospectsAuth = function (prospectId) {
            var defer = $q.defer();

            $http.post("/api/prospect/verifyOk/"+ prospectId, [])
                .then(function (result) {
                    defer.resolve(result.data);
                })
                .catch(function (err) {
                    defer.reject(err.status);
                });
            return defer.promise;
        }
            
        
    }
