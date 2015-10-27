weatherApp.service('customService', function() {
    this.cityName = 'Kiev';
});

weatherApp.service('weatherService', ['$resource', function($resource) {
    this.getWeather  = function(city, days) { 
        var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?&lang=uk&units=metric&appid=bd82977b86bf27fb59a04b61b657fb6f', 
            {
            callback: 'JSON_CALLBACK'
            },
            {
            get: { method: 'JSONP'}
            }  
        );
        return weatherAPI.get({ q: city, cnt: days });
    } 
}]);