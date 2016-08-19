module.exports = function ($scope, AuthenticationService, DashBoardService, $mdToast, $mdDialog, $window, $state) {
    var self = this;
    
    self.players = [];
    
    // restricties zetten
    self.minPlayers = 1;
    self.maxPlayers = 32;
    self.gameTemplates = ["Dragon", "Monkey", "Ox", "Ram", "Rooster", "Shanghai", "Snake"];
    
    // vullen van de players
    for (i = self.minPlayers; i < self.maxPlayers + 1; i++) {
        self.players.push(i);
    }

    //externe login starten
    self.goToLogin = function () {
        AuthenticationService.goToExternalLogin();
    };

    //uitloggen
    self.logOut = function () {
        AuthenticationService.logOut();
    };

    // verwijzen naar dashboard
    self.goToDashboard = function () {
        $state.go('app.dashboard');
    };

    //popup starten om game aan te maken
    self.showAddGamePopup = function () {
        $mdDialog.show({
            templateUrl: 'views/dashboard/add_game.html',
            controller: 'MenuController as MenuC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    };
    
    //popup starten om preferences aan te passen
    self.goToPreferences = function () {
        $mdDialog.show({
            templateUrl: 'views/preference/preferences.html',
            controller: 'PreferenceController as preferencesC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    }
    
    //stoppen van popup voor het maken van een game
    self.closeAddGamePopup = function () {
        $mdDialog.hide();
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
                console.log(result);
            }
        });
    };
};