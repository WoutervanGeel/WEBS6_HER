module.exports = function ($http, APIService) {

    var service = {};

    service.getGame = function (id, callback) {
        $http.get(APIService.game(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.joinGame = function (id, callback) {
        $http.post(APIService.gamePlayers(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.startGame = function (id, callback) {
        $http.post(APIService.gameStart(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    return service;
};