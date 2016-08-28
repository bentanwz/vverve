angular.module("dow")
    .config(function ($stateProvider) {
        $stateProvider
            .state("regaccount",{
                url:"/regaccount",
                templateUrl:"app/acc_reg/regaccount.html"
                // controller: "AccregCtrl as ctrl3"
            })
    });