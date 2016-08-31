angular.module("dow")
    .controller("adminCtrl",adminCtrl);

adminCtrl.$inject = ["dbSvc","$http","$state","$location"];

function adminCtrl(dbSvc, $http,$state,$location) {

    var vm = this;

    vm.prospect = [
        {firstname: ""},
        {lastname: ""},
        {nric : ""},
        {email : ""},
        {profession : ""},
        {profile : ""},
        {status: ""},
        {authCode: ""}
    ];
    vm.status = {
        message: "",
        code: 0
    };

    vm.prospects = function () {
        console.log(vm.prospect);
        dbSvc.prospect(vm.prospect)
        .then(function (result) {
            console.info(result);
            vm.status.message = "Registration Successful!";
            vm.status.code = 202;
            $state.go("lifestyle");
        })
            .catch(function () {
                console.info("Error");
                vm.status.message  = "Registration Failed";
                vm.status.code = 400;
            });
    };
    
    vm.member =[
        {id: ""},
        {firstname: ""},
        {lastname: ""},
        {nric : ""},
        {email : ""},
        {profession : ""},
        {profile : ""},
        {datejoined: ""}
    ];
    vm.status = {
        message: "",
        code: 0
    };

    vm.members = [];

    dbSvc.prospectsList(vm.prospect)
        .then(function (result) {
            console.info(result);
            vm.prospectsList = result;
            console.info(vm.prospectsList);
            vm.status.message = "Prospects Pull Successful!";
            vm.status.code = 202;
        })
        .catch(function () {
            console.info("Error");
            vm.status.message  = "Prospects Pull Failed";
            vm.status.code = 400;
        });
    
    dbSvc.members(vm.member)
        .then(function (result) {
            console.info(result);
            vm.members = result;
            console.info(vm.members);
            vm.status.message = "Members Pull Successful!";
            vm.status.code = 202;
        })
        .catch(function () {
            console.info("Error");
            vm.status.message  = "Members Pull Failed";
            vm.status.code = 400;
        });

    
    vm._login = function(){
        console.log(vm.email + '' + vm.password);
        $http.post("/admin/login",{
            email: vm.email,
            password: vm.password
        }).then(function () {
            console.log("Login OK");
            $state.go("adminmain");
            // $location.url("app/admin/admin.main.html");
        }).catch(function (err) {
            console.log(err);
        });
    };
    
    vm.authorize = function (prospectId) {
        dbSvc.prospectsAuth(prospectId)
            .then(function (result) {
                console.info(result);
                vm.prospectsAuth = result;
                console.info(vm.prospectsAuth);
                vm.status.message = "Authorization Successful!";
                vm.status.code = 202;
            })
            .catch(function () {
                console.info("Error");
                vm.status.message  = "Authorization Failed";
                vm.status.code = 400;
            });
    }
}