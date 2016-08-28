angular.module("dow")
    .controller("loginCtrl");

function loginCtrl($http,$q,$httpParamSerializerJQLike) {

    var vm = this;

    vm.email = '';
    vm.password = '';

    vm._login = function(){
        console.log(vm.email + '' + vm.password);
        $http({
            url: "/login",
            method: "post",
            headers: {
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data: $httpParamSerializerJQLike({
                email: vm.email,
                password: vm.password
            })
        }).then(function () {
            console.log("Login OK");
        }).catch(function (err) {
            console.log(err);
        });
    };
}