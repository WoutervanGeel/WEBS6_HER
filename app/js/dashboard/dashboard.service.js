module.exports = function ($http, APIService) {

    var service = {};

    service.getGames = function (pageSize, pageIndex, callback) {
        $http.get(APIService.games() + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.gameStates = function (callback) {
        $http.get(APIService.gameStates())
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.gameTemplates = function (callback) {
        $http.get(APIService.gameTemplates())
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    return service;
};