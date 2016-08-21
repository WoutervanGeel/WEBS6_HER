module.exports = function (GameService, $stateParams, $filter, Socket, $rootScope, $mdToast) {
    var self = this;
    self.tiles = {};
    self.tempTile = undefined;
    self.players = {};
    self.matchedTiles = {};
    $rootScope.playing = true;

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

    var socket = Socket.connectGame($stateParams.id);
    socket.on('match', function (data) {
        _deleteTileFromBoard(data[0]);
        _deleteTileFromBoard(data[1]);
        _getMatchedTiles();
    });
    
    //ophalen van alle gematchde tiles
    function _getMatchedTiles() { 
        GameService.getMatchedTiles($stateParams.id, function (result) {
            if (result.statusText == 'OK') {
                self.matchedTiles = result.data;
            } else {
                console.log(result.data.message);
            }
        })
    };
    
    //verwijderen van tile van het bord
    function _deleteTileFromBoard(tile) {
        var tileToDelet = $filter('tileById')(self.tiles, tile._id);

        if (tileToDelet != null) {
            var index = self.tiles.indexOf(tileToDelet);
            self.tiles.splice(index, 1);
        }
    };

    self.clickHandler = function (tile) {
        if (_isPlayer()) {
            //gebruiker is een speler
            if (self.tempTile != undefined) {
                // tile bestaat
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
            else {
                //eerste tile
                self.tempTile = tile;
            }
        }
        else {
            $mdToast.show($mdToast.simple().textContent("As a spectator you only can watch"));
        }
    };

    // kijken of gebruiker een speler is
    function _isPlayer() {
        return $filter('spectate')(self.players, $rootScope.username);
    }

    _init();
};