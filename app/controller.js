myApp.controller('homeController', ['$scope','customService','$location', function($scope, customService, $location) {
    $scope.city = customService.cityName;
    $scope.$watch('city', function() {
        customService.cityName = $scope.city;
    });
    
    $scope.submit = function() {
        $location.path('/forecast');
    };
    
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