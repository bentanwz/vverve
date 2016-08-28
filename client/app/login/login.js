angular.module("dow")
    .config(function ($stateProvider) {
        $stateProvider
            .state("login", {
                url:"/login",
                templateUrl: "app/login/login.html",
                controller: "loginCtrl as ctrl"
            })
    });
// (function () {
//     angular
//         .module("dow")
//         .controller("loginCtrl",loginCtrl);
//
//     loginCtrl.$inject = ["dbSvc"];
//
//    
// })();


