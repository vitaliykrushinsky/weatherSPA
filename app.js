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
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

myApp.service('customService', function() {
    this.cityName = 'Kiev';
});

myApp.directive('searchResult', function() {
    return {
        templateUrl: 'directive/searchresult.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertToDate: '&',
            dateFormat: '@'
            
        }
    };
});

myApp.controller('homeController', ['$scope','customService','$location', function($scope, customService, $location) {
    $scope.city = customService.cityName;
    $scope.$watch('city', function() {
        customService.cityName = $scope.city;
    });
    
    $scope.submit = function() {
        $location.path('/forecast');
    }
    
}]);

myApp.controller('forecastController', ['$scope','customService','$resource','$routeParams', function($scope, customService, $resource, $routeParams) {
    
    $scope.city = customService.cityName;
    
    $scope.days = $routeParams.days || '2';
    //console.log($scope.days);
    
    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?&lang=uk&units=metric&appid=bd82977b86bf27fb59a04b61b657fb6f', 
        {
        callback: 'JSON_CALLBACK'
        },
        {
        get: { method: 'JSONP'}
        }  
    );
    //console.log($scope.weatherAPI);
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    //console.log($scope.weatherResult);
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };

    
}]);