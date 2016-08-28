
    angular
        .module("dow")
        .controller("RegCtrl",RegCtrl);

    RegCtrl.$inject = ["dbSvc", "$state"];

    function RegCtrl(dbSvc, $state) {
        var vm = this;
        vm.prospect = {};
        vm.firstname= "";
        vm.lastname= "";
        vm.nric= "";
        vm.email= "";
        vm.profession= "";
        vm.profile= "";
        vm.status = {
            message: "",
            code: 0
        };

        vm.register = function(){
            console.log(vm.prospect);
            dbSvc.save(vm.prospect)
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
    }

