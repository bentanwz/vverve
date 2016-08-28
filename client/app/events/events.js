angular.module("dow")
    .config(function ($stateProvider) {
        $stateProvider
            .state("events", {
                url: "/events",
                templateUrl: "app/events/events.html"
            })
            .state("events.nightlife",{
                url: "/nightlife",
                templateUrl: "app/events/events.nightlife.html",
                controller: "",
                controllerAs: ""
            })
            .state("events.fashion", {
                url: "/fashion",
                templateUrl: "app/events/events.fashion.html",
                controller: "",
                controllerAs: ""
            })
            .state("events.cuisine", {
                url: "/cuisine",
                templateUrl: "app/events/events.cuisine.html",
                controller: "",
                controllerAs: ""
            })
            .state("events.health", {
                url: "/health",
                templateUrl: "app/events/events.health.html",
                controller: "",
                controllerAs: ""
            })
    });