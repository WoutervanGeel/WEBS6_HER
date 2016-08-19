module.exports = function (DashBoardService, $mdToast, $state, Socket, $rootScope) {
    var self = this;
    self.games = {};
    self.game = {};
    self.total;
    $rootScope.playing = false;

    self.setGameStateFilter = function (gameState) {
        self.gameStateFilter = gameState;
    }

    self.options = {
        rowSelection: false,
        multiSelect: false,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: false
    };

    self.selected = [];
    self.limitOptions = [10, 20, 50, 100, {
        label: 'All',
        value: function () {
            return self.total;
        }
    }];

    self.query = {
        order: '-createdOn',
        limit: 10,
        page: 1
    };
    self.resetPages = function () {
        self.query.page = 1;
    };

    self.toggleLimitOptions = function () {
        self.limitOptions = self.limitOptions ? undefined : [5, 10, 15];
    };

    self.onPaginate = function (page, limit) {
        console.log('Scope Page: ' + self.query.page + ' Scope Limit: ' + self.query.limit);
        console.log('Page: ' + page + ' Limit: ' + limit);
        self.promise = $timeout(function () {
        }, 2000);

    };

    self.logOrder = function (order) {
        console.log('order: ', order);
    };

    self.log = function (item) {
        console.log(item.name, 'was selected');
    };

    self.setGame = function (game) {
        //Parse the whole JSON object
        self.game = game;
    };
    DashBoardService.gameStates(function (result) {
        if (result.statusText == 'OK') {
            self.total = result.data[0].count + result.data[1].count + result.data[2].count;
            console.log(total);
        }
    });

    self.getGames = function () {
        DashBoardService.getGames(self.total, self.query.page, function (result) {
            if (result.statusText == 'OK') {
                self.games = result.data;
                console.log(self.games);
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.getGame = function (id) {
        console.log(id);
        DashBoardService.getGame(id, function (result) {
            if (result.statusText == 'OK') {
                console.log(result.data);
                self.game = result.data;

            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.startGame = function (gameId) {
        DashBoardService.startGame(gameId, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Game Started!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    self.joinGame = function (id) {
        console.log(id);
        DashBoardService.joinGame(id, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent('Joined game!'));
                self.getGame(id);
                self.getGames();
                var socket = Socket.connectGame(id);
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.playGame = function (gameId) {
        DashBoardService.getGame(gameId, function (result) {
            console.log(result);
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Playing game!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    self.spectateGame = function (gameId) {
        DashBoardService.getGame(gameId, function (result) {
            console.log(result);
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Spectating game!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    self.playerExists = function (game, username) {
        for (i = 0; i < game.players.length; i++) {
            if (game.players[i]._id == username) {
                return true
            }
        }
    };

    // Load data automatically when the user opens page
    self.getGames();
};