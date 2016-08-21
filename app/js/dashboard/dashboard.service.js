module.exports = function ($http, APIService) {
    
    var game = {
        template: null,
        minPlayers: null,
        maxPlayers: null
    }
    
    var service = {};

    // setter voor de game variabelen
    service.setGameSettings = function (template, minPlayers, maxPlayers) {
        game.template = template;
        game.minPlayers = minPlayers;
        game.maxPlayers = maxPlayers;
    };

    // ophalen van de games
    service.getGames = function (pageSize, pageIndex, callback) {
        $http.get(APIService.games() + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // ophalen van een enkele game
    service.getGame = function (id, callback) {
        $http.get(APIService.game(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // game toevoegen
    service.addGame = function (callback) {
        $http.post(APIService.games(), { templateName: game.template, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers })
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // deelnemen aan een game
    service.joinGame = function (id, callback) {
        $http.post(APIService.gamePlayers(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // starten van een game
    service.startGame = function (id, callback) {
        $http.post(APIService.gameStart(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // opvragen van de games per gamestate
    service.gameStates = function (callback) {
        $http.get(APIService.gameStates())
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    // opvragen van de gameTemplates
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