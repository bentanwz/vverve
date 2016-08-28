angular.module("dow")
    .config(function ($stateProvider) {
        $stateProvider
            .state("adminlogin", {
                url:"/admin/login",
                templateUrl: "app/admin/admin.html",
                controller: "adminCtrl as ctrl"
            })
            .state("adminmain", {
                url:"/main",
                templateUrl: "app/admin/admin.main.html",
                controller: "adminCtrl as ctrl"
            })
            .state("adminmain.prospects",{
                url: "/prospects",
                templateUrl: "app/admin/admin.prospects.html",
                controller: "adminCtrl as ctrl"
            })
            .state("adminmain.members",{
                url: "/members",
                templateUrl: "app/admin/admin.members.html",
                controller: "adminCtrl as ctrl"
            })
    });

