module.exports = function ($scope, AuthenticationService, DashBoardService, $mdToast, $mdDialog, $window, $state, $mdSidenav) {
    var self = this;
    
    self.players = [];
    
    // vul instellingen
    self.minPlayers = 1;
    self.maxPlayers = 32;
    self.gameTemplates = ["Dragon", "Monkey", "Ox", "Ram", "Rooster", "Shanghai", "Snake"];

    // menu toggle
    self.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };

    // vul spelers
    for (var i = self.minPlayers; i < self.maxPlayers + 1; i++) {
        self.players.push(i);
    }

    // wanneer speler niet is ingelogd
    self.goToLogin = function () {
        AuthenticationService.goToExternalLogin();
    };

    // uitloggen
    self.logOut = function () {
        AuthenticationService.logOut();
    };

    // dashboard button action
    self.goToDashboard = function () {
        $state.go('app.dashboard');
    };

    // popup starten om game aan te maken
    self.showAddGamePopup = function () {
        $mdDialog.show({
            templateUrl: 'views/dashboard/add_game.html',
            controller: 'MenuController as MenuC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    };
    
    // stoppen van popup voor het maken van een game
    self.closeAddGamePopup = function () {
        $mdDialog.hide();
    }
    
    // popup starten om preferences aan te passen
    self.goToPreferences = function () {
        $mdDialog.show({
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsController as settingsC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    }
    
    // game aanmaken
    self.addGame = function () {
        //opgeven van de waardes
        DashBoardService.setGameSettings($scope.game.template, $scope.game.minPlayers, $scope.game.maxPlayers);

        //aanvragen van een nieuwe game
        DashBoardService.addGame(function (result) {
            if (result.statusText == 'OK') {
                //gelukt
                $mdToast.show($mdToast.simple().textContent('Nieuwe game aangemaakt'));
                $mdDialog.hide();
                $window.location.reload();
            }
            else {
                //error
                console.error(result);
            }
        });
    };
};