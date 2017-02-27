var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngMessages']);

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
    .otherwise({
		redirectTo: '/'
	});
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
    
    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?&lang=en&units=metric&appid=40d7857a8275d19e5f4170f4d11b3f33', 
        {
        callback: 'JSON_CALLBACK'
        },
        {
        get: { method: 'JSONP'}
        }  
    );
    //console.log($scope.weatherAPI);
    
    // call weatherAPI with some parameters and result store in weatherReasult 
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    //console.log($scope.weatherResult);
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };

    
}]);