module.exports = function ($http, APIService) {

    var service = {};
    var game = {};

    // setten van de game values
    service.setGameSettings = function (template, minPlayers, maxPlayers) {
        game.template = template;
        game.minPlayers = minPlayers;
        game.maxPlayers = maxPlayers;
    };

    // game toevoegen
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