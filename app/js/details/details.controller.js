module.exports = function ($scope, DetailsService, $mdToast, $state, $mdDialog) {

    var self = this;
    
    // game variabele
    self.game =  {};

    // bij opstarten popup
    if($scope != undefined) {
        if($scope.params != undefined) {
            if ($scope.params.game != undefined) {
                self.game = $scope.params.game;
            }
        }
    }

    //starten van een game
    self.startGame = function (gameId) {
        $mdDialog.hide();
        DetailsService.startGame(gameId, function (result) {
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
        DetailsService.joinGame(id, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent('Joined game!'));
                self.getGame(id);
                self.getGames();
                Socket.connectGame(id);
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        });
    };

    // een game spelen
    self.playGame = function (gameId) {
        $mdDialog.hide();
        DetailsService.getGame(gameId, function (result) {
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
        DetailsService.getGame(gameId, function (result) {
            if (result.statusText == 'OK') {
                $mdToast.show($mdToast.simple().textContent("Spectating game!"));
                $state.go('app.game', { id: gameId });
            }
            else {
                $mdToast.show($mdToast.simple().textContent(result.data.message));
            }
        })
    };

    // kijken of een speler in een game is
    self.playerInGame = function (game, username) {
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i]._id == username)
                return true;
        }
        return false;
    };
};