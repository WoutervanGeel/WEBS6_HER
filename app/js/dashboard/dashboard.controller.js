module.exports = function ($scope, DashBoardService, $mdToast, $state, Socket, $rootScope, $mdDialog) {
    var self = this;
    
    //variabelen
    self.games = {};
    self.game =  {};
    self.total = 0;
    self.selected = [];
    $rootScope.playing = false;
    self.gameStateFilter = '';

    // opslaan van game bij laden
    if($scope != undefined) {
        if($scope.params != undefined) {
            if ($scope.params.game != undefined) {
                self.game = $scope.params.game;
            }
        }
    }

    // informatie voor pagination
    self.query = {
        order: '-createdOn',
        limit: 10,
        page: 1
    };

    //opties voor pagination
    self.options = {
        rowSelection: false,
        multiSelect: false,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: false,
        limitOptions: [5, 10, 15, {
            label: 'All',
            value: function () {
                return self.total;
            }
        }]
    };

    //veranderen van de lijstfocus met filters
    self.setGameStateFilter = function (gameState) {
        self.gameStateFilter = gameState;
    }

    //weergeven van game informatie
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

    // terug naar pagina 1
    self.firstPage = function () {
        self.query.page = 1;
    };

    // opslaan van de game
    self.setGame = function (game) {
        self.game = game;
    };

    // berekenen van het totaal aantal games
    DashBoardService.gameStates(function (result) {
        if (result.statusText == 'OK') {
            self.total = result.data[0].count + result.data[1].count + result.data[2].count;
        }
    });

    // ophalen van de games
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

    // enkele game ophalen en opslaan
    self.getGame = function (id) {
        DashBoardService.getGame(id, function (result) {
            if (result.statusText == 'OK') {
                self.game = result.data;
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    //starten van een game
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

    // deelname aan een game aanvragen
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

    // een game spelen
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

    // een game bekijken
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

    // kijken of een speler bestaat
    self.playerInGame = function (game, username) {
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i]._id == username)
                return true;
        }
        return false;
    };

    // ONLOAD
    self.getGames();
};