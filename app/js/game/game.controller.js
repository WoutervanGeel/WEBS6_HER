module.exports = function (GameService, $stateParams, $filter, Socket, $rootScope, $mdToast, TileService) {
    var self = this;
    self.tiles = {};
    self.tempTile = undefined;
    self.players = {}; // ik heb dit toegevoegd voor lijst met spelers
    self.matchedTiles = {};
    $rootScope.playing = true;
    // SOCKET functie die hier moet blijven staan.
    var socket = Socket.connectGame($stateParams.id);
    socket.on('match', function (data) {
        _deleteTileFromBoard(data[0]);
        _deleteTileFromBoard(data[1]);
        _getMatchedTiles();
    });


    _init(); // initialize controller

    self.clickHandler = function (tile) {
        if (_isPlayer()) { // are we a player of this game?
            // second click so check if it is valid
            if (self.tempTile != undefined) {
                TileService.easyVerification(tile, self.tiles);
                GameService.matchTiles($stateParams.id, self.tempTile, tile, function (result) {
                    if (result.statusText == 'OK') {
                        console.log("MATCH");
                        self.tempTile = undefined;
                    }
                    else {
                        $mdToast.show($mdToast.simple().textContent(result.data.message));
                        self.tempTile = undefined;
                    }
                });
            }
            // first click
            else {
                self.tempTile = tile;
            }
        }
        else {
            $mdToast.show($mdToast.simple().textContent("Spectators cant play"));
        }
    };

    function _isPlayer() {
        return $filter('spectate')(self.players, $rootScope.username);
    }

    function _getMatchedTiles() {
        // get matched tiles 
        GameService.getMatchedTiles($stateParams.id, function (result) {
            if (result.statusText == 'OK') {
                self.matchedTiles = result.data;
            } else {
                console.log(result.data.message);
            }
        })
    };

    function _deleteTileFromBoard(tile) {
        // get the tile with the same id from the tilelist
        var tileToDelet = $filter('tileById')(self.tiles, tile._id);

        if (tileToDelet != null) {
            var index = self.tiles.indexOf(tileToDelet);
            self.tiles.splice(index, 1);
        }
    };

    function _init() {
        GameService.getGame($stateParams.id, function (result) {
            if (result.statusText == 'OK') {
                self.players = result.data;
                console.log(result.data);
                console.log(_isPlayer());
            } else {
                console.log(result.data.message);
            }
        });
        GameService.getTiles($stateParams.id, function (result) {
            if (result.statusText == 'OK') {
                self.tiles = result.data;
            } else {
                console.log(result.data.message);
            }
        });

        _getMatchedTiles();
    }
};