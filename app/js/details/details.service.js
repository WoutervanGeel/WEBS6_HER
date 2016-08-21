module.exports = function ($http, APIService) {

    var service = {};

    // ophalen van een game
    service.getGame = function (id, callback) {
        $http.get(APIService.game(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // aanvragen van game joinen
    service.joinGame = function (id, callback) {
        $http.post(APIService.gamePlayers(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // game starten
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