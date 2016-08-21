module.exports = function ($scope, CreateService, $mdToast, $state, Socket, $rootScope, $mdDialog, $window) {
    var self = this;

    // vul instellingen
    self.players = [];
    self.minPlayers = 1;
    self.maxPlayers = 32;
    self.gameTemplates = ["Dragon", "Monkey", "Ox", "Ram", "Rooster", "Shanghai", "Snake"];

    // vul spelers
    for (var i = self.minPlayers; i < self.maxPlayers + 1; i++) {
        self.players.push(i);
    }

    // stoppen van popup voor het maken van een game
    self.closeAddGamePopup = function () {
        $mdDialog.hide();
    };

    // game aanmaken
    self.addGame = function () {
        //opgeven van de waardes
        CreateService.setGameSettings($scope.game.template, $scope.game.minPlayers, $scope.game.maxPlayers);

        //aanvragen van een nieuwe game
        CreateService.addGame(function (result) {
            if (result.statusText == 'OK') {
                //gelukt
                $mdToast.show($mdToast.simple().textContent('Nieuwe game aangemaakt'));
                $window.location.reload();
                $mdDialog.hide();
            }
            else {
                //error
                console.error(result);
            }
        });
    };

};