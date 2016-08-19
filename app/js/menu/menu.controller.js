module.exports = function ($scope, AuthenticationService, DashBoardService, $mdToast, $mdDialog, $window) {
    this.self = this;

    this.self.minPlayers = 1;
    this.self.maxPlayers = 32;
    this.self.players = [];
    this.self.gameTemplates = ["Snake", "Ox", "Dragon", "Shanghai", "Monkey", "Ram", "Rooster"];
    
    for (i = this.self.minPlayers; i < this.self.maxPlayers + 1; i++) {
        this.self.players.push(i);
    }

    this.self.goToLogin = function () {
        AuthenticationService.goToLogin();
    };

    this.self.logOut = function () {
        console.log("Uitloggen");
        AuthenticationService.logOut();
    };

    this.self.goToDashboard = function () {
        AuthenticationService.goToDashboard();
    };

    this.self.showAddGame = function () {
        $mdDialog.show({
            templateUrl: 'views/dashboard/add_game.html',
            controller: 'MenuController as MenuC',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        });
    };
    this.self.goToPref = function () {
        $mdDialog.show({
            templateUrl: 'views/preference/preferences.html',
            controller: 'PreferenceController as PrefC',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    }
    this.self.closeAddGame = function () {
        $mdDialog.hide();
    }
    this.self.addGame = function () {
        DashBoardService.setGameSettings($scope.game.template, $scope.game.minPlayers, $scope.game.maxPlayers);

        DashBoardService.addGame(function (result) {
            if (result.statusText == 'OK') {
                console.log(result.data);
                $mdToast.show($mdToast.simple().textContent('Nieuwe game aangemaakt'));
                $mdDialog.hide();
                $window.location.reload();
            }
            else {
                console.log(result);
            }
        });
    };
};