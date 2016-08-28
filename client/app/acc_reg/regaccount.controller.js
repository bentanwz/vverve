angular
    .module("dow")
    .controller("AccregCtrl",AccregCtrl);

AccregCtrl.$inject = ["dbSvc", "$state"];

function AccregCtrl(dbSvc, $state) {
    var vm = this;
    
    vm.member = {
        nric: "",
        email: "",
        password: "",
        authCode: ""
    };

    vm.status = {
        message: "",
        code: 0
    };
    
    //how to authenticate authCode
    
    vm.register_acc = function () {
        console.log(vm.member);
        dbSvc.member(vm.member)
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
    }
}

