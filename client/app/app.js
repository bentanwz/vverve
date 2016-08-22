angular
    .module("dow", ["ui.router"])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        
    });