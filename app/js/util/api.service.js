module.exports = function () {
    var service = {};
    var _api = {
        base: 'http://mahjongmayhem.herokuapp.com',
        game:
        {
            base: '/games',
            start: '/start',
            players: '/players',
            tiles: {
                base: '/tiles',
                matches: '/matches',
                strue: '?matched=true',
                sfalse: '?matched=false'
            },
        },
        templates: '/gametemplates',
        gameStates: '/gamestates'
    };
    function _gameBase(id) {
        return _api.base + _api.game.base + '/' + id;
    };
    service.tiles = function (id) {
        return _gameBase(id) + _api.game.tiles.base + _api.game.tiles.sfalse;
    };
    service.matchedTiles = function (id) {
        return _gameBase(id) + _api.game.tiles.base + _api.game.tiles.strue;
    };

    service.games = function () {
        return _api.base + _api.game.base;
    };

    service.game = function (id) {
        return _gameBase(id);
    };

    service.gamePlayers = function (id) {
        return _gameBase(id) + _api.game.players
    };
    service.gameStart = function (id) {
        return _gameBase(id) + _api.game.start;
    };
    service.tileMatch = function (id) {
        return _gameBase(id) + _api.game.tiles.base + _api.game.tiles.matches;
    };
    service.gameTemplates = function () {
        return _api.base + _api.templates;
    }
    service.gameStates = function () {
        return _api.base + _api.gameStates;
    }
    return service;
};