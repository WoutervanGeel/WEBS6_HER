module.exports = function ($http, APIService) {

    var service = {};
    var game = {};

    service.setGameSettings = function (template, minPlayers, maxPlayers) {
        game.template = template;
        game.minPlayers = minPlayers;
        game.maxPlayers = maxPlayers;
    };

    service.addGame = function (callback) {
        $http.post(APIService.games(), {
                templateName: game.template,
                minPlayers: game.minPlayers,
                maxPlayers: game.maxPlayers
            })
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    return service;
};