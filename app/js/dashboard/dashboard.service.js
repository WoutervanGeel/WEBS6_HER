module.exports = function ($http, APIService) {
    var api = {
        id: null
    }
    var game = {
        template: null,
        minPlayers: null,
        maxPlayers: null
    }
    var service = {};

    service.setGameSettings = function (template, minPlayers, maxPlayers) {
        game.template = template;
        game.minPlayers = minPlayers;
        game.maxPlayers = maxPlayers;
    };

    service.getGames = function (pageSize, pageIndex, callback) {
        $http.get(APIService.games() + '?pageSize=' + pageSize + '&pageIndex=' + pageIndex)
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    service.getGame = function (id, callback) {
        $http.get(APIService.game(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };


    service.addGame = function (callback) {
        $http.post(APIService.games(), { templateName: game.template, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers })
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