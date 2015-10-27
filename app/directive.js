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