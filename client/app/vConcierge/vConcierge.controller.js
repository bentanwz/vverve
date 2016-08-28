angular.module("dow")
.controller("vConCtrl",vConCtrl);

vConCtrl.$inject = ["$window"];

function vConCtrl($window) {
    var vm = this;

    vm.redirectToBot = function () {
        $window.open("https://www.messenger.com/t/187497395003482",'_blank');
    };
}

