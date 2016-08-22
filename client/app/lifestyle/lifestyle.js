angular.module("dow")
    .config(function ($stateProvider) {
        $stateProvider
            .state("lifestyle", {
                url: "/lifestyle",
                templateUrl: "app/lifestyle/lifestyle.html"
            })
            .state("lifestyle.fashion", {
                url: "/fashion",
                templateUrl: "app/lifestyle/lifestyle.fashion.html",
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                },
                controllerAs: ""
            })
            .state("lifestyle.cuisine", {
                url: "/cuisine",
                templateUrl: "app/lifestyle/lifestyle.cuisine.html",
                controller: "",
                controllerAs: ""
            })
            .state("lifestyle.health", {
                url: "/health",
                templateUrl: "app/lifestyle/lifestyle.health.html",
                controller: "",
                controllerAs: ""
            })
    });