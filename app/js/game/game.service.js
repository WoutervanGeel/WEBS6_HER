module.exports = function ($http, APIService) {
    var service = {};

    service.getTiles = function (id, callback) {
        console.log("get tiles for: " + id);
        $http.get(APIService.tiles(id))
            .then(function (result) {
                callback(result);
            }, function (error) {
                callback(error);
            });
    };
    // Try to match the 2 clicked tiles
    service.matchTiles = function (id, tile1, tile2, callback) {
        console.log("Try match");
        $http.post(APIService.tileMatch(id), { tile1Id: tile1._id, tile2Id: tile2._id })
            .then(function (result) {
                callback(result);
            }, function (error) {
                callback(error);
            });
    };
    // Get matched tiles 
    service.getMatchedTiles = function (id, callback) {
        console.log("Get matched tiles");
        $http.get(APIService.matchedTiles(id))
            .then(function (result) {
                callback(result);
            }, function (error) {
                callback(error);
            });
    };

    service.getGame = function (id, callback) {
        console.log("current game: " + id);
        $http.get(APIService.gamePlayers(id))
            .then(function (response) {
                callback(response);
            }, function (error) {
                callback(error);
            });
    };

    return service;
};