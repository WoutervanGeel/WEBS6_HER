module.exports = function (GameService, $stateParams, $filter, Socket, $rootScope, $mdToast, TileService) {
    var self = this;
    self.tiles = {};
    self.tempTile = undefined;
    self.players = {};
    self.matchedTiles = {};
    $rootScope.playing = true;

    var socket = Socket.connectGame($stateParams.id);
    socket.on('match', function (data) {
        _deleteTileFromBoard(data[0]);
        _deleteTileFromBoard(data[1]);
        _getMatchedTiles();
    });

    _init(); // initialize controller

    self.clickHandler = function (tile) {
        // player is valid
        if (_isPlayer()) {
            // check for match
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
            $mdToast.show($mdToast.simple().textContent("As a spectator you only can watch"));
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
        // get tilte X from tile list
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