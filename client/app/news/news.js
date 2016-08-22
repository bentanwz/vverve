angular.module("dow")
    .config(function ($stateProvider) {
        $stateProvider
            .state("news", {
                url: "/news",
                templateUrl: "app/news/news.html"
            })
            .state("news.fashion", {
                url: "/fashion",
                templateUrl: "app/news/news.fashion.html",
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                },
                controllerAs: ""
            })
            .state("news.cuisine", {
                url: "/cuisine",
                templateUrl: "app/news/news.cuisine.html",
                controller: "",
                controllerAs: ""
            })
            .state("news.health", {
                url: "/health",
                templateUrl: "app/news/news.health.html",
                controller: "",
                controllerAs: ""
            })
    });