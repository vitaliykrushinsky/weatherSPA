var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});


myApp.controller('homeController', ['$scope', function($scope) {
    
}]);

myApp.controller('forecastController', ['$scope', function($scope) {
    
}]);