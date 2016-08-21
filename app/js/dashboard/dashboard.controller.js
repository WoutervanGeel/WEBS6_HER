module.exports = function ($scope, DashBoardService, $mdToast, $state, Socket, $rootScope, $mdDialog) {
    var self = this;
    self.games = {};
    self.game =  {};
    self.total = 0;
    $rootScope.playing = false;
    self.gameStateFilter = '';

    self.setGameStateFilter = function (gameState) {
        self.gameStateFilter = gameState;
    };

    // onload dialog: set game
    if($scope != undefined) {
        if($scope.params != undefined) {
            if ($scope.params.game != undefined) {
                self.game = $scope.params.game;
                console.log(self.game);
            }
        }
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

    self.showDetails = function () {
        var scope = $rootScope.$new();
        scope.params = { game: self.game};
        $mdDialog.show({
            scope: scope,
            templateUrl: 'views/dashboard/details.html',
            controller: 'DashboardController as DashC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

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
        self.game = game;
    };

    DashBoardService.gameStates(function (result) {
        if (result.statusText == 'OK') {
            self.total = result.data[0].count + result.data[1].count + result.data[2].count;
        }
    });

    self.getGames = function () {
        DashBoardService.getGames(self.total, self.query.page, function (result) {
            if (result.statusText == 'OK') {
                self.games = result.data;
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    self.getGame = function (id) {
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
        $mdDialog.hide();
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
        $mdDialog.hide();
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
        $mdDialog.hide();
        DashBoardService.getGame(gameId, function (result) {
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
        $mdDialog.hide();
        DashBoardService.getGame(gameId, function (result) {
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
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i]._id == username)
                return true;
        }
        return false;
    };

    // ONLOAD
    self.getGames();
};