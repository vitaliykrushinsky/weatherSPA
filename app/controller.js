weatherApp.controller('homeController', ['$scope','customService','$location', function($scope, customService, $location) {
    $scope.city = customService.cityName;
    $scope.$watch('city', function() {
        customService.cityName = $scope.city;
    });
    
    $scope.submit = function() {
        $location.path('/forecast');
    };
    
}]);

weatherApp.controller('forecastController', ['$scope','customService','$routeParams','weatherService', function($scope, customService, $routeParams, weatherService) {
    
    $scope.city = customService.cityName;
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
 
}]);